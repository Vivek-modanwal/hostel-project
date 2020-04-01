import React from "react";
import ChangePassword from "./ChangePassword";
import YourInfo from "./YourInfo";

export default class UserInfo extends React.Component {
    state = {
        infobutton: true
    };
    handleinfo = () => {
        if (!this.state.infobutton) this.setState(() => ({ infobutton: true }));
    };
    handlepassword = () => {
        if (this.state.infobutton) this.setState(() => ({ infobutton: false }));
    };
    render() {
        return (
            <div>
                <h1 className="heading111">User Info </h1>
                <div className="userinfoflex">
                    <div>
                        <button
                            className={
                                this.state.infobutton
                                    ? "userinfoflex3"
                                    : "userinfoflex2"
                            }
                            onClick={this.handleinfo}
                        >
                            Your info
                        </button>

                        <button
                            className={
                                this.state.infobutton
                                    ? "userinfoflex2"
                                    : "userinfoflex3"
                            }
                            onClick={this.handlepassword}
                        >
                            change password
                        </button>
                    </div>
                    <div className="overflowcontrol">
                        {this.state.infobutton ? (
                            <YourInfo User={this.props.User} />
                        ) : (
                            <ChangePassword />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
