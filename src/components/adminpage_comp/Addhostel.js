import React from "react";
import Page1 from "./Addhostel_comp/Page1";
import Page2 from "./Addhostel_comp/Page2";
import Page3 from "./Addhostel_comp/Page3";
import Page4 from "./Addhostel_comp/Page4";

class Addhostel extends React.Component {
    state = {
        step: 1,
        hostelName: "",
        roomCapacity: "1",
        roomRange: "",
        disabledRoomRange: "",
        wrapAround: true,
        uploaded: false,
        saved: false,
        newUser: true
    };
    componentDidMount = () => {
        if (this.props.existing) {
            this.setState(() => ({
                hostelName: this.props.existing.name,
                roomCapacity: this.props.existing.capacity,
                roomRange: this.props.existing.roomRange,
                disabledRoomRange: this.props.existing.disabledRoomRange,
                wrapAround: this.props.existing.wrapAround,
                uploaded: this.props.existing.uploaded,
                saved: true,
                id: this.props.existing._id,
                newUser: false
            }));
        }
    };
    componentWillReceiveProps = () => {
        if (!this.state.newUser) {
            this.setState(() => ({
                hostelName: "",
                roomCapacity: "1",
                roomRange: "",
                disabledRoomRange: "",
                wrapAround: true,
                uploaded: false,
                saved: false,
                newUser: true
            }));
        }
    };
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    };
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    };
    handleChange = hostelData => {
        hostelData.saved = true;
        this.setState(() => hostelData);
    };

    uploaded = () => {
        this.setState(() => ({ uploaded: true }));
    };

    render() {
        switch (this.state.step) {
            case 1:
                return (
                    <Page1
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={this.state}
                        existing={!!this.props.existing}
                    />
                );
            case 2:
                return (
                    <Page2
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        upload={this.uploaded}
                        uploaded={this.state.uploaded}
                        id={this.state.id}
                    />
                );
            case 3:
                return (
                    <Page3
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        id={this.state.id}
                    />
                );
            default:
                return <Page4 />;
        }
    }
}
export default Addhostel;
