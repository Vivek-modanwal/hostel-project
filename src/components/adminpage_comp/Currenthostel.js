import React from "react";
import Modal from "react-modal";

class Currenthostel extends React.Component {
  state = {
    options: ["hostel-1", "hostel-2", "hostel-3"],
    selectedOption: undefined,
    notRemove: false
  };
  handleDeleteOption = (optionToRemove) => {
    if ({ optionToRemove }) {
      this.setState((prevState) => ({
        options: prevState.options.filter(
          (option) => optionToRemove !== option
        ),
        selectedOption: undefined
      }));
    } else {
      this.setState(() => ({ selectedOption: undefined }));
    }
  };
  handleselected = (optionToRemove) => {
    this.setState(() => ({ selectedOption: optionToRemove }));
  };
  render() {
    return (
      <div>
        <h1 className="heading111">Current added hostels </h1>
        <p>
          Here you can delete, modify and schedule allotments for current
          hostels
        </p>
        <div className="overflowcontrol">
          {this.state.options.length === 0 && (
            <p className="errorshow">! No Hostels added yet</p>
          )}

          <div className="divcurrenthostels">
            {this.state.options.map((option, index) => (
              <div key={option}>
                <div className="currenthostels">
                  <div>
                    {index + 1}. {option}
                  </div>
                  <div>
                    <button className="removebutton">Edit</button>
                    <button
                      className="removebutton"
                      onClick={(e) => {
                        this.handleselected(option);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Modal
            ariaHideApp={false}
            isOpen={!!this.state.selectedOption}
            contentLabel="selected"
            className="modal"
          >
            <h4>Are you sure to remove {this.state.selectedOption}</h4>

            <div className="yesno-space">
              <button
                className="modalbutton"
                onClick={(e) => {
                  this.handleDeleteOption(this.state.selectedOption);
                }}
              >
                Yes
              </button>
              <button
                className="modalbutton"
                onClick={(e) => {
                  this.handleDeleteOption(this.state.notRemove);
                }}
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

export default Currenthostel;
