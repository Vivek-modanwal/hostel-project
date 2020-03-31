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
        uploaded: false
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
                    />
                );
            case 2:
                return (
                    <Page2
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        upload={this.uploaded}
                        uploaded={this.state.uploaded}
                    />
                );
            case 3:
                return (
                    <Page3
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        values={this.state}
                    />
                );
            case 4:
                return <Page4 />;
        }
    }
}
export default Addhostel;
