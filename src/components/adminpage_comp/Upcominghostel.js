import React from "react";
import axios from "axios";
import Modal from "react-modal";

class Upcomingevents extends React.Component {
    state = {
        hostels: [],
        selectedOptionId: undefined,
        selectedOptionName: undefined
    };
    componentDidMount = async () => {
        try {
            const data = await axios.get(
                "http://localhost:5000/admin/hostels?final=true"
            );
            this.setState(() => ({ hostels: data.data }));
        } catch (e) {
            // handle error if something went wrong
        }
    };
    handleDeleteOption = async e => {
        try {
            if (e.target.id === "yes") {
                await axios.get(
                    `http://localhost:5000/admin/${this.state.selectedOptionId}/discard`
                );
                this.setState(prevState => ({
                    hostels: prevState.hostels.filter(
                        hostel => hostel._id !== this.state.selectedOptionId
                    )
                }));
            }
        } catch (e) {
            // handle error if something went wrong
        }
        this.setState(() => ({
            selectedOptionId: undefined,
            selectedOptionName: undefined
        }));
    };
    handleSelected = (name, id) => {
        this.setState(() => ({
            selectedOptionId: id,
            selectedOptionName: name
        }));
    };
    getDate = date => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };
    render() {
        return (
            <div>
                <h1 className="heading111">Upcoimg Allotments </h1>
                <p>Here you can cancel the scheduled allotments of hostels.</p>
                <div className="overflowcontrol">
                    {this.state.hostels.length === 0 && (
                        <p className="errorshow">! No Hostels added yet</p>
                    )}

                    <div className="divcurrenthostels">
                        {this.state.hostels.map((hostel, index) => (
                            <div key={index}>
                                <div className="currenthostels">
                                    <div className="upcominginfo">
                                        <div>
                                            {index + 1}. {hostel.name}
                                        </div>
                                        <div className="italic">
                                            Allotment will be conducted on{" "}
                                            {this.getDate(hostel.Date)}
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            className="removebutton"
                                            onClick={e => {
                                                this.handleSelected(
                                                    hostel.name,
                                                    hostel._id
                                                );
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Modal
                        ariaHideApp={false}
                        isOpen={!!this.state.selectedOptionId}
                        contentLabel="selected"
                        className="modal"
                    >
                        <h4>
                            Are you sure to cancel allotment of{" "}
                            {this.state.selectedOptionName}
                        </h4>

                        <div className="yesno-space">
                            <button
                                className="modalbutton"
                                id="yes"
                                onClick={this.handleDeleteOption}
                            >
                                Yes
                            </button>
                            <button
                                className="modalbutton"
                                id="no"
                                onClick={this.handleDeleteOption}
                            >
                                No
                            </button>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Upcomingevents;
