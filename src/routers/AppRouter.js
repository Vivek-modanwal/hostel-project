import React from "react";
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
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      isUser: false
    };
  }
  authenticated = (data) => {
    this.setState(() => ({
      isAdmin: data.admin,
      isUser: !data.admin,
      User: data.User
    }));
  };
  getComponent = (Component) => {
    if (this.state.isAdmin) return <Redirect to="/admin" />;
    else if (this.state.isUser) return <Redirect to="/user" />;
    else return <Component authenticated={this.authenticated} />;
  };

  render() {
    return (
      <BrowserRouter>
        <div className="basicflex">
          <Header />
          <div>
            <Switch>
              <Route path="/" component={Homepage} exact={true} />
              <Route path="/login">{this.getComponent(Loginpage)}</Route>
              <Route path="/signup">{this.getComponent(Signup)}</Route>
              <Route path="/help" component={HelpPage} />
              <Route path="/passreset" component={Passwordreset} />
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
              {/* temporary */}
              <Route path="/usercheck" component={Userpage} />
              <Route path="/admincheck" component={Adminpage} />
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
