import React from "react";
import axios from "axios";
//we need last round so we dont show go to the next round

export default class AllotmentResult extends React.Component {
    state = {
        round: 1,
        editable: false,
        result: "G21",
        applied: false,
        error: "",
    };
    componentDidMount = () => {
        this.setState(() => ({
            round: this.props.User.round,
            editable: this.props.User.editable,
            result: this.props.User.result ? this.props.User.result : "",
        }));
    };

    handleChange = (e) => {
        this.setState((prevState) => ({ applied: !prevState.applied }));
    };
    applyForNextRound = async (e) => {
        e.preventDefault();

        try {
            if (this.props.User.nextRound) throw new Error();
            const url = "http://localhost:5000/user/apply";
            const config = {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem("userData"))
                        .token,
                },
            };
            await axios.get(url, config);
            this.setState(() => ({
                error: "you have successfully applied for next Round",
            }));
            this.props.appliedForNextRound();
        } catch (e) {
            this.setState(() => ({
                error: this.props.User.nextRound
                    ? "you have already applied"
                    : "please try again later",
            }));
        }
    };

    handleShow = () => {
        if (this.state.editable) {
            return <p>Allotment is going on</p>;
        } else {
            if (this.state.round === 0) {
                return <p>Allotment is not yet started</p>;
            } else {
                if (this.state.result.length === 0) {
                    return <p>No room is alloted to you</p>;
                } else {
                    return (
                        <div>
                            <p>Your got room {this.state.result}</p>
                            {this.state.round === 1 && (
                                <form onSubmit={this.applyForNextRound}>
                                    <input
                                        type="checkbox"
                                        htmlFor="wantround"
                                        name="wantround"
                                        onChange={this.handleChange}
                                        checked={this.state.applied}
                                    />
                                    <span id="wantroom">Apply for Round-2</span>
                                    <input
                                        type="submit"
                                        value="Apply"
                                        disabled={!this.state.applied}
                                    />
                                </form>
                            )}
                        </div>
                    );
                }
            }
        }
    };

    render() {
        return (
            <div>
                {this.state.error && (
                    <p className="errorshow">{this.state.error}</p>
                )}
                {this.handleShow()}
            </div>
        );
    }
}
