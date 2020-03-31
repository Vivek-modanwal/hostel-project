import React from "react";
import validator from "validator";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      redirect: false
    };
  }
  Submitted = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const username = e.target.username.value.trim();
    e.target.password.value = "";
    e.target.username.value = "";
    const re = /^[A-Za-z0-9]{8,15}$/;
    let error = "";
    if (password.length < 8)
      error = "password must contain atleast eight characters";
    else if (password.length > 15)
      error = "password must contain atmax fifteen characters";
    else if (!re.test(password))
      error = "password must contain only alphaNumeric characters";
    try {
      this.setState(() => ({
        error: error
      }));
      if (error) throw new Error("invalid password");

      const credential = {};
      credential.password = password;
      if (validator.isEmail(username)) {
        credential.email = username;
      } else {
        credential.userid = username;
      }
      const Data = await axios.post("http://localhost:5000/login", credential);
      this.props.authenticated(Data.data);
      this.setRedirect();
    } catch (e) {
      const error = e.response;
      if (error && error.status >= 400 && error.status < 500)
        this.setState(() => ({
          error: "invalid username or password"
        }));
    }
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/admin" />;
    }
  };
  render() {
    return (
      <div className="temp">
        {this.renderRedirect()}
        <form onSubmit={this.Submitted}>
          {this.state.error && <p className="errorshow">{this.state.error}</p>}
          <p>Enter username</p>
          <p>
            <input type="text" name="username" required={true} />
          </p>
          <p>Enter password</p>
          <p>
            <input type="password" name="password" required={true} />
          </p>
          <input type="submit" value="Submit" />
          <div className="separate.signup_forget">
            <div>
              {" "}
              <p>
                <Link to="/pass_reset">Forget Password</Link>
              </p>
              <p>Don't have an Account ?</p>
              <p>
                <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
