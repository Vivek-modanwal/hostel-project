import React from "react";
import Login from "./Loginpage_comp/Login";

class Loginpage extends React.Component {
  render() {
    return (
      <div className="loginflex">
        <div className="login">
          <Login />
        </div>
        <div className="logininfo">
          some info aboout this page with a lot of details
        </div>
      </div>
    );
  }
}

export default Loginpage;
