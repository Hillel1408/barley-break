import React from "react";
import { useTimer } from "react-timer-hook";

const MyTimer = ({ expiryTimestamp }: { expiryTimestamp: any }) => {
    const { seconds, minutes } = useTimer({
        expiryTimestamp,
        onExpire: () => console.warn("onExpire called"),
    });

    return <div></div>;
};

export default MyTimer;
