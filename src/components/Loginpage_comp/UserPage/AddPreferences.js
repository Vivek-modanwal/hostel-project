import React from 'react';


export default class AddPrefernces extends React.Component {
    state = {
        floors: ["F", "G", "S"],
        fill: [],
        rooms: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

    }
    checkPrevRoom = (room) => {
        for (let i = 0; i < this.state.fill.length; i++) {
            if (room === this.state.fill[i]) {
                return false;
            }
        }
        return true;
    }
    handleAddRoom = (e) => {
        e.preventDefault();
        const room = e.target.elements.floorName.value;
        const room_no = e.target.elements.room__no.value;
        const fillup = room + "-" + room_no
        // console.log(room);
        // console.log(room_no);
        if (this.checkPrevRoom(fillup)) {
            this.setState((prevState) => ({
                fill: prevState.fill.concat(fillup)
            }));

        } else {
            console.log("this is also present");
            alert("this is also present");
        }

    }
    render() {
        return (
            <div>
                {this.state.fill.length !== 0 && <div><p>Your selected room is</p><hr /></div>}
                {this.state.fill.length !== 0 &&
                    <span>{this.state.fill.map(room => (<span key={room}>{room + "   "}</span>))}</span>
                }
                <form onSubmit={this.handleAddRoom}>
                    {this.state.floors.length !== 0 &&
                        <select name="floorName">
                            {this.state.floors.map(floor => (<option key={floor}>{floor}</option>))};
                        </select>
                    }
                    {this.state.rooms.length !== 0 &&
                        <select name="room__no">
                            {this.state.rooms.map(room_no => (<option key={room_no}>{room_no}</option>))};
                        </select>
                    }
                    <input type="submit" name="submit" />
                </form>


            </div>


        );


    }

}