import React from "react";

export default class YourInfo extends React.Component {
    render() {
        const details = this.props.User;
        return (
            <div className="spacing">
                <h4>Hello {details.name}</h4>
                <p>Your Email : {details.email}</p>
                <p>Your Rank : {details.rank}</p>
                <p>your room allotment is under process</p>
            </div>
        );
    }
}
