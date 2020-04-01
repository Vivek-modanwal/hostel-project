// csv upload
import React from "react";
import axios from "axios";
import validateCSV from "./csvFileValidation";

class Page2 extends React.Component {
    state = {
        inValidMessages: []
    };
    handleupload = async e => {
        e.preventDefault();
        if (!e.target.elements.csvData.files[0]) return;
        const csvData = await validateCSV(e.target.elements.csvData.files[0]);
        console.log(csvData.data);
        console.log(csvData.inValidMessages);
        try {
            if (csvData.inValidMessages.length > 0) {
                throw new Error();
            }
            this.setState(() => ({ inValidMessages: [] }));
            console.log(this.props.id);
            await axios.post(
                `http://localhost:5000/admin/${this.props.id}/upload`
            );

            this.props.upload();
        } catch (e) {
            if (csvData.inValidMessages.length > 0) {
                this.setState(() => ({
                    inValidMessages: csvData.inValidMessages
                }));
            }
            //handel error from server if any
        }
    };
    render() {
        return (
            <div>
                <h1 className="heading111">Add New Hostel</h1>
                <div>
                    <h3 className="page2.1">Upload .csv file here...</h3>
                </div>
                <p>
                    column headers must be same as provided <b>Userid</b>,
                    <b>Email</b>,<b>Name</b>,<b>Rank</b>,<b>Disable</b>
                </p>
                {this.props.uploaded && (
                    <p>you have already uploaded the CSV</p>
                )}
                <form className="container" onSubmit={this.handleupload}>
                    <input type="file" name="csvData" accept=".csv" />
                    <input type="submit" value="Upload" />
                </form>{" "}
                {this.state.inValidMessages.length > 0 &&
                    this.state.inValidMessages.map((msg, index) => (
                        <h3 className="errorshow" key={index}>
                            {msg}
                        </h3>
                    ))}
                <button onClick={this.props.prevStep}>Back</button>
                <button
                    disabled={!this.props.uploaded}
                    onClick={this.props.nextStep}
                >
                    Next
                </button>
            </div>
        );
    }
}
export default Page2;
