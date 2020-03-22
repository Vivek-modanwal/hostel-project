import React from "react";
import validator from "validator";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordError: ""
    };
  }
  Submitted = e => {
    e.preventDefault();
    const password = e.target.password.value;
    const username = e.target.username.value.trim();
    e.target.password.value = "";
    e.target.username.value = "";
    console.log(password);
    const re = /^[A-Za-z0-9]{8,15}$/;

    this.setState(() => ({
      passwordError: re.test(password) ? "" : "please enter valid password"
    }));

    const credential = {};
    credential.password = password;
    if (validator.isEmail(username)) {
      credential.email = username;
    } else {
      credential.userid = username;
    }
    console.log(credential);
    fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify(credential),
      headers: {
        "Content-type": "application/ json; charset = UTF - 8"
      }
    })
      .then(res => {
        res.json();
      })
      .then(data => console.log(data))
      .catch(e => "please enter valid credentials");
  };
  render() {
    return (
      <div className="temp">
        <form onSubmit={this.Submitted}>
          <p>Enter username</p>
          <p>
            <input type="text" name="username" required={true} />
          </p>
          <p>Enter password</p>
          <p>
            <input type="password" name="password" required={true} />
          </p>
          {this.state.passwordError && <p>{this.state.passwordError}</p>}

          <input type="submit" value="Submit" />
          <div className="separate.signup_forget">
            <div>
              <p>Don't have an Account ?</p>
              <p>
                <Link to="/signup">Sign up</Link>
              </p>
            </div>
            <p>
              <Link to="/pass_reset">Forget Password</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
