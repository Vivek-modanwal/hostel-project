import React from "react";
import ChangePassword from "./Userpage_comp/ChangePassword";
import AllotmentResult from "./Userpage_comp/AllotmentResult";
import AddPreferences from "./Userpage_comp/AddPreferences";

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
        //console.log(this.props.User.disabled)
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
                        disabled={!this.props.User.editable}
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
                        (this.state.addPreferences && (
                            <AddPreferences User={this.props.User} />
                        )) ||
                        (this.state.allotmentResult && <AllotmentResult />)}
                </div>
            </div>
        );
    }
}

export default Userpage;
