//  hostel details....
import React from "react";
import validateRange from "./errorCheck";

class Page1 extends React.Component {
    state = {
        errormessage: ""
    };

    saveAndContinue = e => {
        e.preventDefault();
        const elements = e.target.elements;
        const hostelData = {};
        hostelData.hostelName = elements.hostelName.value;
        hostelData.roomCapacity = elements.roomCapacity.value;
        hostelData.roomRange = elements.roomRange.value;
        hostelData.disabledRoomRange = elements.disabledRoomRange.value;
        hostelData.wrapAround = elements.wrapAround.checked;

        try {
            validateRange(hostelData.roomRange, "Room Range");
            if (hostelData.disabledRoomRange) {
                validateRange(
                    hostelData.disabledRoomRange,
                    "Room Range for physically disabled"
                );
            }

            // call axios for adding the hostel to database

            this.props.handleChange(hostelData);
            this.props.nextStep();
            this.setState(() => ({ errormessage: "" }));
        } catch (e) {
            this.setState(() => ({ errormessage: e.message }));
        }
    };

    render() {
        return (
            <div>
                <h1 className="heading111">Add New Hostel</h1>
                {this.state.errormessage && (
                    <p className="errorshow">{this.state.errormessage}</p>
                )}
                <form onSubmit={this.saveAndContinue}>
                    <h4>Enter Hostel Details</h4>
                    <p>Hostel Name</p>
                    <input
                        type="text"
                        name="hostelName"
                        placeholder="hostel name"
                        defaultValue={this.props.values.hostelName}
                        required={true}
                    />
                    <p>Each room capacity</p>
                    <select
                        name="roomCapacity"
                        defaultValue={this.props.values.roomCapacity}
                    >
                        <option value="1">1 person</option>
                        <option value="2">2 persons</option>
                        <option value="3">3 persons</option>
                        <option value="4">4 persons</option>
                        <option value="5">5 persons</option>
                        <option value="6">6 persons</option>
                    </select>
                    <p>Rooms Range (eg. G1-G8, F1-F5, F7)</p>
                    <input
                        type="text"
                        placeholder="rooms range"
                        name="roomRange"
                        defaultValue={this.props.values.roomRange}
                        required={true}
                    />
                    <p>Rooms range for physically disabled</p>
                    <input
                        type="text"
                        placeholder="rooms range"
                        name="disabledRoomRange"
                        defaultValue={this.props.values.disabledRoomRange}
                    />
                    <div>
                        <label>
                            <p>
                                <input
                                    type="checkbox"
                                    name="wrapAround"
                                    defaultChecked={
                                        this.props.values.wrapAround
                                    }
                                />
                                Wrap Around
                            </p>
                        </label>
                    </div>
                    <p>
                        <input
                            type="submit"
                            name="submit"
                            value="Save and Next"
                        />
                    </p>
                </form>
            </div>
        );
    }
}

export default Page1;
