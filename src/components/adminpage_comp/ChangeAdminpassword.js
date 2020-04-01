import React from "react";

export default class ChangeAdminpassword extends React.Component {
  state = {
    previousPassword: ["vivek"],
    errormessage: ""
  };

  checkPrevPassword = (option) => {
    for (let i = 0; i < this.state.previousPassword.length; i++) {
      if (option === this.state.previousPassword[i]) {
        return true;
      }
    }
    return false;
  };

  handleChangePassword = (e) => {
    e.preventDefault();
    const prevPassword = e.target.elements.prevPassword.value;
    const newPassword = e.target.elements.newPassword.value;
    const retypePassword = e.target.elements.retypePassword.value;
    if (newPassword !== retypePassword) {
      this.setState(() => ({
        errormessage: "! New password and re-entered password did not match"
      }));
      //console.log("Your retype password and password is not matched")
    } else {
      if (this.checkPrevPassword(prevPassword)) {
        console.log("Password Changed Successfully");
      } else {
        this.setState(() => ({
          errormessage: "!Wrong old Password"
        }));
        //console.log("Your previous password is wrong");
      }
    }
    // console.log(prevPassword);
    // console.log(newPassword);
    // console.log(retypePassword);
    e.target.elements.prevPassword.value = "";
    e.target.elements.newPassword.value = "";
    e.target.elements.retypePassword.value = "";
  };

  resetInput = (e) => {
    e.target.elements.prevPassword.value = "";
    e.target.elements.newPassword.value = "";
    e.target.elements.retypePassword.value = "";
  };

  changeErrorMessage = () => {
    this.setState(() => ({
      errormessage: ""
    }));
  };

  render() {
    return (
      <div>
        <h3>Change Password below by entering following credentials</h3>

        <form
          className="formdiv"
          onSubmit={this.handleChangePassword}
          onReset={this.resetInput}
        >
          {this.state.errormessage && (
            <p className="errorshow">{this.state.errormessage}</p>
          )}
          <p>
            <label htmlFor="id_prevPassword">Old Password</label>
            <input
              className="float"
              type="password"
              id="id_prevPassword"
              name="prevPassword"
              required={true}
            />
          </p>

          <p>
            <label htmlFor="id_newPassword">New Password</label>
            <input
              className="float"
              type="password"
              id="id_newPassword"
              name="newPassword"
              required={true}
            />
          </p>

          <p>
            <label htmlFor="id_retypePassword">Re-Enter Password</label>
            <input
              className="float"
              type="password"
              id="id_retypePassword"
              name="retypePassword"
              required={true}
            />
          </p>
          <input
            className="submitbuttonspace"
            type="reset"
            name="reset"
            onClick={this.changeErrorMessage}
          />
          <input
            className="submitbuttonspace"
            type="submit"
            name="submit"
            value="Save"
            onClick={this.changeErrorMessage}
          />
        </form>
      </div>
    );
  }
}
