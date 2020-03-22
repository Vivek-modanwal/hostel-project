import React from "react";

class Addhostel extends React.Component {
    state = {
        capacityerror: ""
    };
    Submitted = e => {
        e.preventDefault();
        const hostelname = e.target.hostelname.value.trim();
        const capacity = e.target.capacity.value;
        e.target.hostelname.value = "";
        e.target.capacity.value = "";
        console.log(capacity);
        const re = /^[0-9]{1,4}$/;

        this.setState(() => ({
            capacityerror: re.test(capacity)
                ? ""
                : "! please enter positive integer value only"
        }));

        const credential = {};
        credential.hostelname = hostelname;

        fetch("http://localhost:3000/admincheck", {
            method: "GET",
            body: JSON.stringify(credential),
            headers: {
                "Content-type": "application/ json; charset = UTF - 8"
            }
        })
            .then(res => {
                res.json();
            })
            .then(data => console.log(data))
            .catch(e => "please enter valid credentials");
    };
    render() {
        return (
            <div>
                <h1 className="adminheading">Add new hostel here</h1>
                <p>Please fill in the following details...</p>
                <form onSubmit={this.Submitted}>
                    <p>Hostel name</p>
                    <p>
                        <input type="text" name="hostelname" required={true} />
                    </p>
                    <p>Hostel capacity</p>
                    <p>
                        <input type="number" name="capacity" required={true} />
                    </p>
                    {this.state.capacityerror && (
                        <p className="errorshow">{this.state.capacityerror}</p>
                    )}
                    <p>
                        wrap-around (to fill remaining students in already
                        filled rooms)
                    </p>
                    <p>
                        <input
                            type="radio"
                            id="yes"
                            name="wrap"
                            value="yes"
                            required={true}
                        />
                        <label htmlFor="yes">Yes</label>
                    </p>
                    <p>
                        <input
                            type="radio"
                            id="no"
                            name="wrap"
                            value="no"
                            required={true}
                        />
                        <label htmlFor="no">No</label>
                    </p>
                    <p>Enter the range of rooms</p>
                    <p>
                        <input type="text" name="roomrange" required={true} />
                    </p>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Addhostel;
