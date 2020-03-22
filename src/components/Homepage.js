import React from "react";
import Notice from "./homepage_comp/Notice";

class Homepage extends React.Component {
  render() {
    return (
      <div className="homeflex">
        <div className="homeinfo">What's this!</div>
        <Notice />
      </div>
    );
  }
}

export default Homepage;
