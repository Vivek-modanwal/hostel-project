import React from "react";
import Option from "./options";
import Select from "react-select";

export default class AddPrefernces extends React.Component {
    state = {
        normalFloors: this.props.User.vacantRooms.map(detail => detail.prefix),
        disabledFloors: this.props.User.disabled
            ? this.props.User.disabledRooms.map(detail => detail.prefix)
            : [],
        normalPreferences:
            !this.props.User.disabled || !this.props.User.disabledQuota
                ? this.props.User.preferences
                : [],
        disabledPreferences:
            this.props.User.disabled && this.props.User.disabledQuota
                ? this.props.User.preferences
                : [],
        rooms:
            this.props.User.disabled && this.props.User.disabledQuota
                ? this.props.User.disabledRooms.length > 0
                    ? this.props.User.disabledRooms[0].rooms
                    : []
                : this.props.User.vacantRooms.length > 0
                ? this.props.User.vacantRooms[0].rooms
                : [],
        disabledQuota: this.props.User.disabledQuota,
        errormessage: "",
        value: ""
    };

    checkPreferenceList = Room => {
        if (this.props.User.disabled && this.state.disabledQuota) {
            return this.state.disabledPreferences.some(room => room === Room);
        } else {
            return this.state.normalPreferences.some(room => room === Room);
        }
    };
    getPreferences = () => {
        if (this.props.User.disabled && this.state.disabledQuota) {
            return this.state.disabledPreferences;
        } else {
            return this.state.normalPreferences;
        }
    };
    updatePreferences = pref => {
        if (this.props.User.disabled && this.state.disabledQuota) {
            this.setState(() => ({ disabledPreferences: pref }));
        } else {
            this.setState(() => ({ normalPreferences: pref }));
        }
    };
    handleDeleteOption = removeOption => {
        let preferences = this.getPreferences();
        preferences = preferences.filter(option => option !== removeOption);
        this.updatePreferences(preferences);
        this.setState(() => ({ errormessage: "" }));
    };

    handleUpOption = upOption => {
        let preferences = this.getPreferences();
        for (let i = 1; i < preferences.length; i++) {
            if (preferences[i] === upOption) {
                let temp = preferences[i - 1];
                preferences[i - 1] = upOption;
                preferences[i] = temp;
            }
        }
        this.updatePreferences(preferences);
    };

    handleDownOption = downOption => {
        let preferences = this.getPreferences();
        preferences = preferences.filter(option => option !== downOption);
        preferences.push(downOption);
        this.updatePreferences(preferences);
    };

    sendAllValue = e => {
        e.preventDefault();
        const referral = e.target.elements.referral.value;
        const referee = e.target.elements.referee.value;
        console.log(`Referral:${referral} Referee:${referee}`);
        console.log("send data");
        //send all the data by this function
        //<Redirect to="/" />
    };

    handleAddRoom = e => {
        e.preventDefault();
        const prefix = e.target.elements.floors.value;
        const roomNo = e.target.elements.roomNo.value;
        const room = prefix + roomNo;
        if (!roomNo) {
            this.setState(() => ({
                errormessage: "please select any room"
            }));
        } else if (this.getPreferences().length > 10) {
            this.setState(() => ({
                errormessage: "maximum limit exceeded"
            }));
        } else if (!this.checkPreferenceList(room)) {
            if (this.props.User.disabled && this.state.disabledQuota) {
                this.setState(prevState => ({
                    disabledPreferences: prevState.disabledPreferences.concat(
                        room
                    ),
                    errormessage: ""
                }));
            } else {
                this.setState(prevState => ({
                    normalPreferences: prevState.normalPreferences.concat(room),
                    errormessage: ""
                }));
            }
        } else {
            this.setState(() => ({
                errormessage: "this room is already added"
            }));
        }
    };

    handleChange = e => {
        let floorNo = e.target.value;
        let rooms;
        if (this.props.User.disabled && this.state.disabledQuota) {
            this.props.User.disabledRooms.forEach(detail => {
                if (detail.prefix === floorNo) rooms = detail.rooms;
            });
        } else {
            this.props.User.vacantRooms.forEach(detail => {
                if (detail.prefix === floorNo) rooms = detail.rooms;
            });
        }
        this.setState(() => ({ rooms: rooms, value: "" }));
    };

    changeHadicappedQuota = () => {
        this.setState(prevState => ({
            disabledQuota: !prevState.disabledQuota,
            value: ""
        }));
    };

    showFloors = () => {
        let floors;
        if (this.props.User.disabled && this.state.disabledQuota) {
            floors = this.state.disabledFloors;
        } else {
            floors = this.state.normalFloors;
        }
        if (floors.length !== 0) {
            return (
                <select
                    className="floor"
                    name="floors"
                    onChange={this.handleChange}
                    defaultValue={floors[0]}
                >
                    {floors.map(floor => (
                        <option key={floor} value={floor}>
                            {floor}
                        </option>
                    ))}
                </select>
            );
        }
    };
    changeSelect = value => {
        this.setState(() => ({ value: value }));
    };
    showRooms = () => {
        if (this.state.rooms.length > 0) {
            return (
                <div className="room">
                    {" "}
                    <Select
                        className="selectroom"
                        name="roomNo"
                        onChange={this.changeSelect}
                        value={this.state.value}
                        placeholder="Select Room"
                        options={this.state.rooms.map(room => ({
                            value: room,
                            label: room
                        }))}
                    />
                </div>
            );
        }
    };

    showMessage = () => {
        let msg = "Preference-wise rooms list:";
        if (this.props.User.disabled && this.state.disabledQuota) {
            if (this.state.disabledPreferences.length === 0)
                msg = "your preference list is empty";
        } else {
            if (this.state.normalPreferences.length === 0)
                msg = "your preference list is empty";
        }
        return <p className="msg">{msg}</p>;
    };

    showOptions = () => {
        let rooms;
        if (this.props.User.disabled && this.state.disabledQuota)
            rooms = this.state.disabledPreferences;
        else rooms = this.state.normalPreferences;

        return rooms.map((room, index) => (
            <Option
                key={index}
                length={rooms.length}
                roomText={room}
                position={index + 1}
                handleDeleteOption={this.handleDeleteOption}
                handleUpOption={this.handleUpOption}
                handleDownOption={this.handleDownOption}
            />
        ));
    };

    render() {
        return (
            <div>
                <h1 className="heading111">Select your preferences</h1>
                <h3>Current Round : {this.props.User.round}</h3>

                <div className="overflowcontrol">
                    <div className="preferenceflex">
                        <form
                            className="addroomform"
                            onSubmit={this.handleAddRoom}
                        >
                            {this.props.User.disabled && (
                                <p>
                                    <label>
                                        <input
                                            className="checksize"
                                            type="checkbox"
                                            name="disabledQuota"
                                            checked={this.state.disabledQuota}
                                            onChange={
                                                this.changeHadicappedQuota
                                            }
                                        />
                                        Select Under Handicapped Division only?
                                    </label>
                                </p>
                            )}
                            <div className="selectlimit">
                                {" "}
                                <p>
                                    {" "}
                                    Select floor No. :{" "}
                                    <p>{this.showFloors()}</p>
                                </p>
                                <p>Select Room No. : {this.showRooms()}</p>
                                <input
                                    className="addroom"
                                    type="submit"
                                    name="submit"
                                    value="Add room"
                                />
                            </div>
                        </form>
                        <div className="preferencelist">
                            {this.state.errormessage && (
                                <p className="errorshow">
                                    {this.state.errormessage}
                                </p>
                            )}
                            {this.showMessage()}
                            <span>{this.showOptions()}</span>
                        </div>
                    </div>
                    <div>
                        {
                            <h4 className="underlined">
                                {" "}
                                Fill the reference details
                            </h4>
                        }
                        {/*create a new form for referral and referee*/}
                        <form onSubmit={this.sendAllValue}>
                            <input
                                type="text"
                                placeholder="referral"
                                name="referral"
                            />
                            <input
                                type="text"
                                placeholder="referee"
                                name="referee"
                            />
                            <p>
                                {" "}
                                <input
                                    className="preferencesubmit"
                                    type="submit"
                                    name="Sumit"
                                    value="Submit"
                                />
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
