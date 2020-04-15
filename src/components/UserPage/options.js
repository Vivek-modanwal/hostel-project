import React from "react";

const Option = props => (
    <div className="roomoptions">
        <span className="listname">
            {props.position}. {props.roomText}
        </span>

        <span>
            <button
                className="movebutton"
                disabled={props.position === 1 ? true : false}
                onClick={e => {
                    props.handleUpOption(props.roomText);
                }}
            >
                move up
            </button>
        </span>
        <span>
            <button
                className="movebutton"
                disabled={props.position === props.length ? true : false}
                onClick={e => {
                    props.handleDownOption(props.roomText);
                }}
            >
                move down
            </button>
        </span>
        <span>
            <button
                className="movebutton"
                onClick={e => {
                    props.handleDeleteOption(props.roomText);
                }}
            >
                remove
            </button>
        </span>
    </div>
);

export default Option;
