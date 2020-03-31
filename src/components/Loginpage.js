import React from "react";
import Login from "./Loginpage_comp/Login";

class Loginpage extends React.Component {
  render() {
    return (
      <div className="loginflex">
        <div className="login">
          <Login authenticated={this.props.authenticated} />
        </div>
        <div className="logininfo">
          <h2>Login Here...</h2>
          <p>
            Here users or students can login using login credentials sent on
            their mails
          </p>
          <p>
            while admins or wardens can login using their e-mails provided
            during signup
          </p>
        </div>
      </div>
    );
  }
}

export default Loginpage;
