import React from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
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
      isAuthenticated: false
    };
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="fullpadding">
            <Header />
            <Switch>
              <Route path="/" component={Homepage} exact={true} />
              <Route path="/login" component={Loginpage} />
              <Route path="/signup" component={Signup} />
              <Route path="/help" component={HelpPage} />
              <Route path="/passreset" component={Passwordreset} />
              {this.state.isAuthenticated && (
                <Route path="/user" component={Userpage} />
              )}

              {this.state.isAuthenticated && (
                <Route path="/admin" component={Adminpage} />
              )}
              {/* temporary */}
              <Route path="/admincheck" component={Adminpage} />
              <Route path="/usercheck" component={Userpage} />

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
