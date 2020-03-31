import React from "react";
import axios from "axios";

class Notice extends React.Component {
  state = {
    students: ["nitish", "vivek", "vivek", "anonymous"]
  };

  createNoticeElement = () =>
    this.state.students.map((student, index) => (
      <p className="ptag" key={index}>
        {student}
      </p>
    ));

  componentDidMount = async () => {
    try {
      const data = await axios.get("http://localhost:5000/getNotification");
      this.setState((state) => ({
        students: state.students.concat(data.data)
      }));
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <div className="content0">
        <h1 className="h1tag">Notifications</h1>
        <marquee className="marquee_content" direction="up" className="marq">
          <div>{this.createNoticeElement()}</div>
        </marquee>
      </div>
    );
  }
}

export default Notice;
