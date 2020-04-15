import React from "react";
import Addhostel from "./adminpage_comp/Addhostel";
import Currenthostel from "./adminpage_comp/Currenthostel";
import Upcomingevents from "./adminpage_comp/Upcominghostel";
import AdminInfo from "./adminpage_comp/AdminInfo";
import ShowUsers from "./showUsers/ShowUsers";

class Adminpage extends React.Component {
    state = {
        admininfo: true,
        addhostel: false,
        currenthostel: false,
        upcominghostel: false,
        edithostel: false,
        showUsers: false,
    };
    admininfo = () => {
        this.setState(() => ({
            admininfo: true,
            addhostel: false,
            currenthostel: false,
            upcominghostel: false,
            edithostel: false,
            showUsers: false,
        }));
    };
    add = () => {
        this.setState(() => ({
            admininfo: false,
            addhostel: true,
            currenthostel: false,
            upcominghostel: false,
            edithostel: false,
            showUsers: false,
            hostelDetail: null,
        }));
    };
    current = () => {
        this.setState(() => ({
            admininfo: false,
            addhostel: false,
            currenthostel: true,
            upcominghostel: false,
            edithostel: false,
            showUsers: false,
        }));
    };
    upcoming = () => {
        this.setState(() => ({
            admininfo: false,
            addhostel: false,
            currenthostel: false,
            upcominghostel: true,
            edithostel: false,
            showUsers: false,
        }));
    };
    edithostel = (hostelDetail) => {
        //console.log("from edithostel function");
        this.setState(() => ({
            admininfo: false,
            addhostel: false,
            currenthostel: true,
            upcominghostel: false,
            edithostel: true,
            showUsers: false,
            hostelDetail: hostelDetail,
        }));
    };
    showUsers = (hostelDetail) => {
        this.setState(() => ({
            admininfo: false,
            addhostel: false,
            currenthostel: true,
            upcominghostel: false,
            edithostel: false,
            showUsers: true,
            hostelDetail: hostelDetail,
        }));
    };
    closeUsers = () => {
        this.setState(() => ({
            admininfo: false,
            addhostel: false,
            currenthostel: true,
            upcominghostel: false,
            edithostel: false,
            showUsers: false,
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
                        <div className={this.state.showUsers ? "" : "admindiv"}>
                            {(this.state.showUsers && (
                                <ShowUsers
                                    hostel={this.state.hostelDetail}
                                    closeUsers={this.closeUsers}
                                />
                            )) ||
                                ((this.state.edithostel ||
                                    this.state.addhostel) && (
                                    <Addhostel
                                        existing={this.state.hostelDetail}
                                    />
                                )) ||
                                (this.state.admininfo && (
                                    <AdminInfo User={this.props.User} />
                                )) ||
                                (this.state.currenthostel && (
                                    <Currenthostel
                                        edithostel={this.edithostel}
                                        showUsers={this.showUsers}
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
