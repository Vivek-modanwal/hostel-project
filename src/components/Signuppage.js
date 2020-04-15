import React from "react";
import axios from "axios";

class Signup extends React.Component {
    state = {
        error: "",
        disabled: false,
    };
    submitSignup = async (e) => {
        e.preventDefault();
        this.setState(() => ({ disabled: true }));
        const firstName = e.target.elements.firstName.value.trim();
        const lastName = e.target.elements.lastName.value.trim();
        const email = e.target.elements.email.value.trim();
        const password = e.target.elements.password.value;
        const rPassword = e.target.elements.rPassword.value;
        const credential = {};
        try {
            const re = /^[A-Za-z0-9]{8,15}$/;
            if (!re.test(password))
                throw new Error("Password Must contain only AlphaNumerics");
            if (password !== rPassword)
                throw new Error("Both passwords must be same");

            credential.name = firstName + " " + lastName;
            credential.email = email;
            credential.password = password;
            const Data = await axios.post(
                "http://localhost:5000/signup",
                credential
            );
            this.props.authenticated(Data.data);
        } catch (e) {
            let msg = "";
            if (e.response) {
                const error = e.response;
                if (error.status >= 400 && error.status < 500) {
                    msg = "provided email already exist";
                } else {
                    msg = "Please Try Again Later";
                }
            } else {
                msg = e.message;
            }
            this.setState(() => ({ error: msg }));
        }
        this.setState(() => ({ disabled: false }));
    };
    render() {
        return (
            <div className="outline">
                <div className="setpadding">
                    <form className="form" onSubmit={this.submitSignup}>
                        {this.state.error && (
                            <p className="errorshow">{this.state.error}</p>
                        )}
                        <p>
                            <label htmlFor="firstName">First Name</label>
                            <label className="red">*</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                required={true}
                            />
                        </p>

                        <p>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" name="lastName" />
                        </p>

                        <div className="email">
                            <p>
                                <label htmlFor="emailid">Email</label>
                                <label className="red">*</label>
                                <input
                                    type="email"
                                    id="emailid"
                                    name="email"
                                    required={true}
                                />
                            </p>

                            <div className="password">
                                <p>
                                    <label htmlFor="password_id">
                                        Password
                                    </label>
                                    <label className="red">*</label>
                                    <input
                                        type="password"
                                        id="password_id"
                                        name="password"
                                        required={true}
                                        minLength={8}
                                        maxLength={15}
                                    />
                                </p>
                            </div>

                            <div className="retypepassword">
                                <p>
                                    <label htmlFor="retypePassword_id">
                                        Confirm Password
                                    </label>
                                    <label className="red">*</label>
                                    <input
                                        type="password"
                                        id="retypePassword_id"
                                        name="rPassword"
                                        required={true}
                                        minLength={8}
                                        maxLength={15}
                                    />
                                </p>
                            </div>
                            <div className="term">
                                <input
                                    type="checkbox"
                                    id="term_id"
                                    name="checkbox"
                                    required={true}
                                />
                                <label htmlFor="term_id">
                                    I accept the terms of Use & Privacy Policy
                                </label>
                                <br />
                            </div>
                            <input
                                type="submit"
                                id="create_an_Account"
                                name="submit"
                                value="Create Account"
                                disabled={this.state.disabled}
                            />
                        </div>
                    </form>
                </div>
                <div className="box-info">
                    {" "}
                    <h2>Signup Here...</h2>
                    <p>
                        Please provide appropriate details as they will be used
                        later
                    </p>
                </div>
            </div>
        );
    }
}

export default Signup;
