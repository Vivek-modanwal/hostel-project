import React from "react";



export default class ChangePassword extends React.Component {
    state = {
        previousPassword: ["ghghg"]
    }

    checkPrevPassword = (option) => {
        for (let i = 0; i < this.state.previousPassword.length; i++) {
            if (option === this.state.previousPassword[i]) {
                return true;
            }
        }
        return false;
    }

    handleChangePassword = (e) => {
        e.preventDefault();
        const prevPassword = e.target.elements.prevPassword.value;
        const newPassword = e.target.elements.newPassword.value;
        const retypePassword = e.target.elements.retypePassword.value;
        if (newPassword !== retypePassword) {
            console.log("Your retype password and password is not matched")
        }
        else {
            if (this.checkPrevPassword(prevPassword)) {
                console.log("Your password is changed and you are logined");
            }
            else {
                console.log("Your previous password is wrong");
            }
        }
        // console.log(prevPassword);
        // console.log(newPassword);
        // console.log(retypePassword);
        e.target.elements.prevPassword.value = "";
        e.target.elements.newPassword.value = "";
        e.target.elements.retypePassword.value = "";
    }

    resetInput = (e) => {
        e.target.elements.prevPassword.value = "";
        e.target.elements.newPassword.value = "";
        e.target.elements.retypePassword.value = "";
    }

    render() {
        return (
            <div>
                <h1>Password Changing Information</h1>
                <hr />
                <form onSubmit={this.handleChangePassword} onReset={this.resetInput}>
                    <label htmlFor="id_prevPassword">Previous Password</label>
                    <input type="password" id="id_prevPassword" name="prevPassword" /><br />
                    <label htmlFor="id_newPassword">New Password</label>
                    <input type="password" id="id_newPassword" name="newPassword" /><br />
                    <label htmlFor="id_retypePassword">Retype Password</label>
                    <input type="password" id="id_retypePassword" name="retypePassword" /><br />
                    <input type="submit" name="submit" />
                    <input type="reset" name="reset" />
                </form>

            </div >
        );


    }




}