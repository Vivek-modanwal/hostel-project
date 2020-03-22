import React from "react";
import axios from "axios";

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
    async componentDidMount() {
        try {
            const data = await axios.get(
                "http://localhost:5000/getNotification"
            );
            this.setState(state => ({
                students: state.students.concat(data.data)
            }));
        } catch (e) {
            console.log(e);
        }
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
