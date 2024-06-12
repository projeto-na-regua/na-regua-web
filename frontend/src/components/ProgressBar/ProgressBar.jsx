import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "../../../node_modules/react-circular-progressbar/dist/styles.css"
import ProgressBarProvider from "./ProgressBarProvider";

const ProgressBar = (props) => {
    const { score } = props;

    const calcColor = (percent, start, end) => {
        let a = percent / 100,
            b = (end - start) * a,
            c = b + start;

        return "hsl(" + c + ", 100%, 50%";
    };

    return (
        <ProgressBarProvider valueStart={0} valueEnd={score}>
            {(value) => (
                <CircularProgressbar
                    value={value}
                    text={`${value} %`}
                    circleRatio={.5}
                    styles={{
                        trail: {
                            strokeLinecap: "butt",
                            transform: "rotate(-90deg)",
                            transformOrigin: "center center",
                        },
                        path: {
                            strokeLinecap: "butt",
                            transform: "rotate(-90deg)",
                            transformOrigin: "center center",
                            stroke: calcColor(value, 0, 120),
                        },
                        text: {
                            fill: "#ddd",
                        },
                    }}
                    strokeWidth={10}
                />
            )}
        </ProgressBarProvider>
    );
};

export default ProgressBar;
