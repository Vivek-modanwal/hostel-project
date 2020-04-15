import React from "react";
import axios from "axios";
import SearchPanel from "./searchPanel";
import ContentTable from "./ContentTable";
import Pagination from "./pagination";

// will get the hostelid and total users from calling component as props
class ShowUsers extends React.Component {
    constructor(props) {
        super(props);
        //console.log(props.hostel);
        this.state = {
            hostelName: props.hostel.name,
            totalUsers: props.hostel.users,
            hostelid: props.hostel._id,
            limit: 20,
            Users: [],
            search: null,
            sortBy: "rank",
            order: "asc",
            reset: true,
        };
    }

    componentDidMount = async () => {
        //console.log(this.state.hostelid);
        const url = `http://localhost:5000/admin/${this.state.hostelid}/users?skip=0&limit=${this.state.limit}&sortBy=rank:asc`;
        await this.loadData(url);
    };

    loadData = async (url) => {
        //console.log(this.state.hostelid);
        try {
            const config = {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem("userData"))
                        .token,
                },
            };
            const data = await axios.get(url, config);
            this.setState(() => ({ Users: data.data }));
            return true;
        } catch (e) {
            return false;
        }
    };

    submitted = async (data) => {
        const url = `http://localhost:5000/admin/${
            this.state.hostelid
        }/users?skip=0&limit=${this.state.limit}&sortBy=${data.sortBy}:${
            data.order
        }${data.search ? "&" + data.search : ""}`;

        const loaded = await this.loadData(url);
        if (loaded) {
            this.setState((prevState) => ({
                sortBy: data.sortBy,
                order: data.order,
                search: data.search,
                reset: !prevState.reset,
            }));
        }
    };

    pageChanged = async (pageNo) => {
        let skip = (pageNo - 1) * this.state.limit;
        const url = `http://localhost:5000/admin/${
            this.state.hostelid
        }/users?skip=${skip}&limit=${this.state.limit}&sortBy=${
            this.state.sortBy
        }:${this.state.order}${
            this.state.search ? "&" + this.state.search : ""
        }`;
        return await this.loadData(url);
    };
    todaysDate = (given) => {
        if (!given) return false;
        const temp = new Date();
        const curr = new Date(
            temp.getFullYear(),
            temp.getMonth(),
            temp.getDate()
        ).getTime();
        return given === curr;
    };

    render() {
        return (
            <div className="ShowUsers">
                <button
                    className="swCloseButton"
                    onClick={(e) => this.props.closeUsers()}
                >
                    X
                </button>
                {this.state.totalUsers === 0 && <p>No Users to show</p>}
                {this.state.totalUsers !== 0 && (
                    <h3>Users of {this.state.hostelName}</h3>
                )}
                {this.state.totalUsers !== 0 && (
                    <SearchPanel submitted={this.submitted} />
                )}
                {this.state.totalUsers !== 0 &&
                    this.state.Users.length === 0 && <p>No users Found!!</p>}
                {this.state.Users.length !== 0 && (
                    <ContentTable
                        Users={this.state.Users}
                        disabled={this.todaysDate(this.props.hostel.Date)}
                    />
                )}
                {this.state.totalUsers > this.state.limit &&
                    !this.state.search && (
                        <Pagination
                            totalPages={Math.ceil(
                                this.state.totalUsers / this.state.limit
                            )}
                            pageChanged={this.pageChanged}
                            reset={this.state.reset}
                        />
                    )}
            </div>
        );
    }
}

export default ShowUsers;
