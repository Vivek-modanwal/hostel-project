import React from "react";

class Signup extends React.Component {
  render() {
    return (
      <div className="outline">
        <div className="setpadding">
          <form className="form" onSubmit={this.submitSignup}>
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
                <input type="email" id="emailid" name="Email" required={true} />
              </p>

              <div className="password">
                <p>
                  <label htmlFor="password_id">Password</label>
                  <label className="red">*</label>
                  <input
                    type="password"
                    id="password_id"
                    name="Email"
                    required={true}
                  />
                </p>
              </div>

              <div className="retypepassword">
                <p>
                  <label htmlFor="retypePassword_id">Confirm Password</label>
                  <label className="red">*</label>
                  <input
                    type="password"
                    id="retypePassword_id"
                    name="retypeEmail"
                    required={true}
                  />
                </p>
              </div>
              <div className="term">
                <input type="checkbox" id="term_id" />
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
              />
            </div>
          </form>
        </div>
        <div className="box-info">
          {" "}
          <h2>Signup Here...</h2>
          <p>Please provide appropriate details as they will be used later</p>
        </div>
      </div>
    );
  }
}

export default Signup;
