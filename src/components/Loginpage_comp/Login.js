import React from "react";
import validator from "validator";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            redirect: false,
        };
    }
    Submitted = async (e) => {
        e.preventDefault();
        const password = e.target.password.value;
        const username = e.target.username.value.trim();
        e.target.password.value = "";
        e.target.username.value = "";

        try {
            const re = /^[A-Za-z0-9]{8,15}$/;
            if (!re.test(password))
                throw new Error(
                    "password must contain only alphaNumeric characters"
                );

            const credential = {};
            credential.password = password;
            if (validator.isEmail(username)) {
                credential.email = username;
            } else {
                credential.userid = username;
            }

            // authenticating credentials from backend
            const Data = await axios.post(
                "http://localhost:5000/signin",
                credential
            );
            this.props.authenticated(Data.data);
            this.setRedirect();
        } catch (e) {
            let msg = "";
            if (e.response) {
                const error = e.response;
                if (error.status >= 400 && error.status < 500) {
                    msg = "incorrect username or password";
                } else {
                    msg = "Please Try Again Later";
                }
            } else {
                msg = e.message;
            }
            this.setState(() => ({ error: msg }));
        }
    };

    setRedirect = () => {
        this.setState({
            redirect: true,
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
                    {this.state.error && (
                        <p className="errorshow">{this.state.error}</p>
                    )}
                    <p>Enter username</p>
                    <p>
                        <input
                            type="text"
                            name="username"
                            required={true}
                            maxLength={50}
                        />
                    </p>
                    <p>Enter password</p>
                    <p>
                        <input
                            type="password"
                            name="password"
                            required={true}
                            maxLength={15}
                            minLength={8}
                        />
                    </p>
                    <input
                        className="loginsubmit"
                        type="submit"
                        value="Submit"
                    />
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
