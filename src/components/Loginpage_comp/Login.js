import React from "react";
import validator from "validator";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordError: false,
            invalidCredential: false,
            redirect: false
        };
    }
    Submitted = async e => {
        e.preventDefault();
        const password = e.target.password.value;
        const username = e.target.username.value.trim();
        e.target.password.value = "";
        e.target.username.value = "";
        const re = /^[A-Za-z0-9]{8,15}$/;
        try {
            this.setState(() => ({
                passwordError: !re.test(password),
                invalidCredential: false
            }));
            if (!re.test(password)) throw new Error("invalid password");
            const credential = {};
            credential.password = password;
            if (validator.isEmail(username)) {
                credential.email = username;
            } else {
                credential.userid = username;
            }
            const data = await axios.post(
                "http://localhost:5000/login",
                credential
            );
            this.setState(() => ({
                invalidCredential: false
            }));
            this.props.authenticated(data.data);
            this.setRedirect();
        } catch (e) {
            const error = e.response;
            if (error && error.status >= 400 && error.status < 500)
                this.setState(() => ({
                    invalidCredential: true
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
                    {this.state.invalidCredential && (
                        <p>username or password is incorrect</p>
                    )}
                    <p>Enter username</p>
                    <p>
                        <input type="text" name="username" required={true} />
                    </p>
                    <p>Enter password</p>
                    <p>
                        <input
                            type="password"
                            name="password"
                            required={true}
                        />
                    </p>
                    {this.state.passwordError && <p>password is invalid</p>}

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
