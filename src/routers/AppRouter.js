import React from "react";
import axios from "axios";
//import {Get} from "../Axios"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Homepage from "../components/Homepage";
import Loginpage from "../components/Loginpage";
import Signup from "../components/Signuppage";
import Adminpage from "../components/Adminpage";
import HelpPage from "../components/HelpPage";
import Userpage from "../components/Userpage";
import NotFoundPage from "../components/NotFoundPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Passwordreset from "../components/Passwordresetpage";

class AppRouter extends React.Component {
    state = {
        isAdmin: false,
        isUser: false,
    };

    //this method is used to check whether the user is logged in or not
    UNSAFE_componentWillMount = async () => {
        if (localStorage.getItem("userData")) {
            try {
                const userData = JSON.parse(localStorage.getItem("userData"));
                const url = `http://localhost:5000/${
                    userData.admin ? "admin" : "user"
                }`;
                const config = { headers: { Authorization: userData.token } };
                const data = await axios.get(url, config);
                this.setState(() => ({
                    User: data.data,
                    isAdmin: userData.admin,
                    isUser: !userData.admin,
                }));
            } catch (e) {
                localStorage.removeItem("userData");
            }
        }
    };

    authenticated = (data) => {
        const userData = {};
        userData.token = data.token;
        userData.admin = data.admin;
        localStorage.setItem("userData", JSON.stringify(userData));
        this.setState(() => ({
            isAdmin: data.admin,
            isUser: !data.admin,
            User: data.User,
        }));
    };

    getComponent = (Component) => {
        if (this.state.isAdmin) {
            return <Redirect to="/admin" />;
        } else if (this.state.isUser) {
            return <Redirect to="/user" />;
        } else return <Component authenticated={this.authenticated} />;
    };

    logout = async () => {
        //logging out from backend
        try {
            const token = JSON.parse(localStorage.getItem("userData")).token;
            const url = `http://localhost:5000/${
                this.state.isAdmin ? "admin" : "user"
            }/logout`;

            await axios.get(url, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            localStorage.removeItem("userData");
            this.setState(() => ({
                isAdmin: false,
                isUser: false,
            }));
        } catch (e) {}
    };

    render() {
        return (
            <BrowserRouter>
                <div className="basicflex">
                    <Header
                        logout={this.logout}
                        admin={this.state.isAdmin}
                        user={this.state.isUser}
                    />
                    <div>
                        <Switch>
                            <Route path="/" component={Homepage} exact={true} />
                            <Route path="/login">
                                {this.getComponent(Loginpage)}
                            </Route>
                            <Route path="/signup">
                                {this.getComponent(Signup)}
                            </Route>
                            <Route path="/help" component={HelpPage} />
                            <Route
                                path="/passreset"
                                component={Passwordreset}
                            />
                            {this.state.isUser && (
                                <Route path="/user">
                                    <Userpage User={this.state.User} />
                                </Route>
                            )}

                            {this.state.isAdmin && (
                                <Route path="/admin">
                                    <Adminpage User={this.state.User} />
                                </Route>
                            )}
                            <Route component={NotFoundPage} />
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
