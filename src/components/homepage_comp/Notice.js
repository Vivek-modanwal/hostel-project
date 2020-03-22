import React from "react";

class Notice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: ["nitish", "vivek", "vivek", "anonymous"]
    };
    this.createNoticeElement = this.createNoticeElement.bind(this);
  }
  createNoticeElement() {
    return this.state.students.map((student, index) => (
      <p key={index}>{student}</p>
    ));
  }
  componentWillMount() {
    fetch("http://localhost:3000/getNotification")
      .then(res => res.json())
      .then(info =>
        this.setState(state => ({
          students: state.students.concat(info)
        }))
      );
  }
  render() {
    return (
      <div className="content0">
        <h1 className="h1tag">Notifications</h1>
        <marquee direction="up" className="marq">
          <div className="ptag">{this.createNoticeElement()}</div>
        </marquee>
      </div>
    );
  }
}

export default Notice;
