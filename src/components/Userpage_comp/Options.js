import React from "react";

const Option = props => (
    <div>
        <span>
            {props.position}.{props.roomText}
        </span>
        <span>
            <button
                onClick={e => {
                    props.handleDeleteOption(props.roomText);
                }}
            >
                X
            </button>
        </span>
        <span>
            <button
                disabled={props.position === 1 ? true : false}
                onClick={e => {
                    props.handleUpOption(props.roomText);
                }}
            >
                UP
            </button>
        </span>
        <span>
            <button
                disabled={props.position === props.length ? true : false}
                onClick={e => {
                    props.handleDownOption(props.roomText);
                }}
            >
                DOWN
            </button>
        </span>
    </div>
);

export default Option;
