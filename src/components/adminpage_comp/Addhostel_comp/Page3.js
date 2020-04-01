//date filling
import React from "react";
import axios from "axios";
class Page3 extends React.Component {
    state = {
        errormessage: ""
    };
    saveAndContinue = async e => {
        e.preventDefault();

        //validating the date

        let temp = new Date();
        const curr = new Date(
            temp.getFullYear(),
            temp.getMonth(),
            temp.getDate()
        );
        temp = new Date(e.target.elements.date.value);
        const provided = new Date(
            temp.getFullYear(),
            temp.getMonth(),
            temp.getDate()
        );
        try {
            if (provided.getTime() <= curr.getTime()) {
                throw new Error("Date must be greater than current Date");
            }

            // send the date to backend using axios
            await axios.post(
                `http://localhost:5000/admin/${this.props.id}/finalSubmit`,
                { Date: e.target.elements.date.value }
            );

            this.setState(() => ({ errormessage: "" }));
            this.props.nextStep();
        } catch (e) {
            if (e.message) {
                this.setState(() => ({ errormessage: e.message }));
            }
            //handle error from server if any
        }
    };
    render() {
        return (
            <div>
                <h1 className="heading111">Add New Hostel</h1>
                <p>
                    Provide the Date for allotment and final submit for
                    processing.....
                </p>
                {this.state.errormessage && (
                    <p className="errorshow">{this.state.errormessage}</p>
                )}
                <form onSubmit={this.saveAndContinue}>
                    <input
                        className="page3"
                        type="date"
                        name="date"
                        required={true}
                    />
                    <p>
                        <button onClick={this.props.prevStep}>Back</button>
                        <input type="submit" value="Final Submit" />
                    </p>
                </form>
            </div>
        );
    }
}
export default Page3;
