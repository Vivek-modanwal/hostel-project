import React from "react";
import Select from "react-select";

const tempRoom = ["1", "2", "3", "4"];

export default class AllotmentResult extends React.Component {
    state = {
        selectedOption: null,
        options: tempRoom.map(room => ({ label: room, value: room }))
    };
    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };
    render() {
        const { selectedOption } = this.state;

        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={this.state.options}
            />
        );
    }
}
