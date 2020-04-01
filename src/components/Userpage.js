import React from "react";
import UserInfo from "./UserPage/UserInfo";
import AddPreferences from "./UserPage/AddPreferences";
import AllotmentResult from "./UserPage/AllotmentResult";

class Userpage extends React.Component {
    state = {
        userInfo: true,
        addPreferences: false,
        allotmentResult: false
    };

    userInfo = () => {
        this.setState(() => ({
            userInfo: true,
            addPreferences: false,
            allotmentResult: false
        }));
    };
    addPreferences = () => {
        this.setState(() => ({
            userInfo: false,
            addPreferences: true,
            allotmentResult: false
        }));
    };
    allotmentResult = () => {
        this.setState(() => ({
            userInfo: false,
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
                            this.state.userInfo ? "buttonactive" : "flexdiv"
                        }
                        onClick={this.userInfo}
                    >
                        User Info
                    </button>
                    <button
                        className={
                            this.state.addPreferences
                                ? "buttonactive"
                                : "flexdiv"
                        }
                        onClick={this.addPreferences}
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
                        onClick={this.allotmentResult}
                    >
                        Allotment Results
                    </button>
                </div>
                <div className="flex2">
                    <h1 className="allheadings">User Workspace</h1>
                    <div className="admindiv">
                        {(this.state.userInfo && (
                            <UserInfo User={this.props.User} />
                        )) ||
                            (this.state.addPreferences && (
                                <AddPreferences User={this.props.User} />
                            )) ||
                            (this.state.allotmentResult && <AllotmentResult />)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Userpage;
