import React from "react";
import Addhostel from "./adminpage_comp/Addhostel";
import Currenthostel from "./adminpage_comp/Currenthostel";
import Upcomingevents from "./adminpage_comp/Upcominghostel";

class Adminpage extends React.Component {
    state = {
        addhostel: false,
        currenthostel: false,
        upcominghostel: false
    };

    add = () => {
        this.setState(() => ({
            addhostel: true,
            currenthostel: false,
            upcominghostel: false
        }));
    };
    current = () => {
        this.setState(() => ({
            addhostel: false,
            currenthostel: true,
            upcominghostel: false
        }));
    };
    upcoming = () => {
        this.setState(() => ({
            addhostel: false,
            currenthostel: false,
            upcominghostel: true
        }));
    };
    render() {
        return (
            <div className="flex-container0">
                <div className="flex-container1">
                    <button
                        className={
                            this.state.addhostel ? "buttonactive" : "flexdiv"
                        }
                        onClick={this.add}
                    >
                        Add new hostel
                    </button>
                    <button
                        className={
                            this.state.currenthostel
                                ? "buttonactive"
                                : "flexdiv"
                        }
                        onClick={this.current}
                    >
                        Current hostels
                    </button>
                    <button
                        className={
                            this.state.upcominghostel
                                ? "buttonactive"
                                : "flexdiv"
                        }
                        onClick={this.upcoming}
                    >
                        Upcoming allotments
                    </button>
                </div>
                <div className="admindiv">
                    {(this.state.addhostel && <Addhostel />) ||
                        (this.state.currenthostel && <Currenthostel />) ||
                        (this.state.upcominghostel && <Upcomingevents />)}
                </div>
            </div>
        );
    }
}

export default Adminpage;
