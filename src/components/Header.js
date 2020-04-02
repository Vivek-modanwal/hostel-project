import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import Success from "./adminpage_comp/Addhostel_comp/Page4";

class Header extends React.Component {
    render() {
        return (
            <div className="header0">
                {/* temporary */}
                <NavLink to="/admincheck">admin-check</NavLink>{" "}
                <div>
                    <p className="header01">
                        Welcome To Hostel Rooms Allocation App. ...
                    </p>
                    <p className="header1">
                        ..a better platform for easy allocations
                    </p>
                </div>
                <div className="nav0">
                    <div>
                        {" "}
                        <NavLink
                            to="/"
                            className="nav1"
                            activeClassName="nav2"
                            exact={true}
                        >
                            Home
                        </NavLink>
                        {(this.props.admin || this.props.user) && (
                            <NavLink
                                to={this.props.admin ? "/admin" : "/user"}
                                className="nav1"
                                activeClassName="nav2"
                            >
                                {" "}
                                {this.props.admin ? "Admin" : "User"}{" "}
                            </NavLink>
                        )}
                        {!(this.props.admin || this.props.user) && (
                            <NavLink
                                to="/login"
                                className="nav1"
                                activeClassName="nav2"
                            >
                                {" "}
                                LogIn{" "}
                            </NavLink>
                        )}
                        {!(this.props.admin || this.props.user) && (
                            <NavLink
                                to="/signup"
                                className="nav1"
                                activeClassName="nav2"
                            >
                                {" "}
                                SignUp{" "}
                            </NavLink>
                        )}
                        <NavLink
                            to="/help"
                            className="nav1"
                            activeClassName="nav2"
                        >
                            {" "}
                            Support{" "}
                        </NavLink>
                        {(this.props.admin || this.props.user) && (
                            <NavLink
                                to="/"
                                onClick={this.props.logout}
                                className="logout"
                            >
                                {" "}
                                LogOut{" "}
                            </NavLink>
                        )}
                    </div>
                    <div>{/* logout button here */}</div>
                </div>
            </div>
        );
    }
}
export default Header;
