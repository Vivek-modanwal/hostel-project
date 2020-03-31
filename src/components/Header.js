import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
  <div className="header0">
    {/* temporary */}
    <NavLink to="/admincheck">admin-check</NavLink>{" "}
    <NavLink to="/usercheck">user-check</NavLink>
    <div>
      <p className="header01">Welcome To Hostel Rooms Allocation App. ...</p>
      <p className="header1">..a better platform for easy allocations</p>
    </div>
    <div className="nav0">
      <NavLink to="/" className="nav1" activeClassName="nav2" exact={true}>
        Home
      </NavLink>
      <NavLink to="/login" className="nav1" activeClassName="nav2">
        {" "}
        LogIn{" "}
      </NavLink>
      <NavLink to="/signup" className="nav1" activeClassName="nav2">
        {" "}
        SignUp{" "}
      </NavLink>

      <NavLink to="/help" className="nav1" activeClassName="nav2">
        {" "}
        Support{" "}
      </NavLink>
    </div>
  </div>
);

export default Header;
