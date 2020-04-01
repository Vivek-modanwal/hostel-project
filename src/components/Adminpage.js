import React from "react";
import Addhostel from "./adminpage_comp/Addhostel";
import Currenthostel from "./adminpage_comp/Currenthostel";
import Upcomingevents from "./adminpage_comp/Upcominghostel";
import AdminInfo from "./adminpage_comp/AdminInfo";

class Adminpage extends React.Component {
    state = {
        admininfo: true,
        addhostel: false,
        currenthostel: false,
        upcominghostel: false,
        edithostel: false
    };
    admininfo = () => {
        this.setState(() => ({
            admininfo: true,
            addhostel: false,
            currenthostel: false,
            upcominghostel: false,
            edithostel: false
        }));
    };
    add = () => {
        this.setState(() => ({
            admininfo: false,
            addhostel: true,
            currenthostel: false,
            upcominghostel: false,
            edithostel: false
        }));
    };
    current = () => {
        this.setState(() => ({
            admininfo: false,
            addhostel: false,
            currenthostel: true,
            upcominghostel: false,
            edithostel: false
        }));
    };
    upcoming = () => {
        this.setState(() => ({
            admininfo: false,
            addhostel: false,
            currenthostel: false,
            upcominghostel: true,
            edithostel: false
        }));
    };
    edithostel = hostelDetail => {
        this.setState(() => ({
            admininfo: false,
            addhostel: false,
            currenthostel: true,
            upcominghostel: false,
            edithostel: true,
            hostelDetail: hostelDetail
        }));
    };
    render() {
        return (
            <div>
                <div className="flex-container0">
                    <div className="flex-container1">
                        <button
                            className={
                                this.state.admininfo
                                    ? "buttonactive"
                                    : "flexdiv"
                            }
                            onClick={this.admininfo}
                        >
                            Admin Info
                        </button>
                        <button
                            className={
                                this.state.addhostel
                                    ? "buttonactive"
                                    : "flexdiv"
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
                    <div className="flex2">
                        <h1 className="allheadings">Admin Workspace</h1>
                        <div className="admindiv">
                            {(this.state.edithostel && (
                                <Addhostel existing={this.state.hostelDetail} />
                            )) ||
                                (this.state.admininfo && (
                                    <AdminInfo User={this.props.User} />
                                )) ||
                                (this.state.addhostel && <Addhostel />) ||
                                (this.state.currenthostel && (
                                    <Currenthostel
                                        edithostel={this.edithostel}
                                    />
                                )) ||
                                (this.state.upcominghostel && (
                                    <Upcomingevents />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Adminpage;
