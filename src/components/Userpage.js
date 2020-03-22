import React from "react";
import ChangePassword from "./Userpage_comp/ChangePassword";
import AddPreferences from "./Userpage_comp/AddPreferences";
import AllotmentResult from "./Userpage_comp/AllotmentResult";

class Userpage extends React.Component {
    state = {
        changePassword: false,
        addPreferences: false,
        allotmentResult: false
    };

    passwordChange = () => {
        this.setState(() => ({
            changePassword: true,
            addPreferences: false,
            allotmentResult: false
        }));
    };
    current = () => {
        this.setState(() => ({
            changePassword: false,
            addPreferences: true,
            allotmentResult: false
        }));
    };
    upcoming = () => {
        this.setState(() => ({
            changePassword: false,
            addPreferences: false,
            allotmentResult: true
        }));
    };
    render() {
        return (
            <div className="flex-container0">
                <div className="flex-container1">
                    <button
                        className={
                            this.state.changePassword
                                ? "buttonactive"
                                : "flexdiv"
                        }
                        onClick={this.passwordChange}
                    >
                        Change Password
                    </button>
                    <button
                        className={
                            this.state.addPreferences
                                ? "buttonactive"
                                : "flexdiv"
                        }
                        onClick={this.current}
                    >
                        Add Preferences
                    </button>
                    <button
                        className={
                            this.state.allotmentResult
                                ? "buttonactive"
                                : "flexdiv"
                        }
                        onClick={this.upcoming}
                    >
                        See Allotment Result
                    </button>
                </div>
                <div className="admindiv">
                    {(this.state.changePassword && <ChangePassword />) ||
                        (this.state.addPreferences && <AddPreferences />) ||
                        (this.state.allotmentResult && <AllotmentResult />)}
                </div>
            </div>
        );
    }
}

export default Userpage;
