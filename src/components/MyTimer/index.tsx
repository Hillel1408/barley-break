import React from "react";
import { useTimer } from "react-timer-hook";

const MyTimer = ({ expiryTimestamp }: { expiryTimestamp: any }) => {
    const { seconds, minutes } = useTimer({
        expiryTimestamp,
        onExpire: () => console.warn("onExpire called"),
    });

    return (
        <div className="bg-[#F54D0D] text-white text-[80px] font-bold px-6">
            {minutes}:{seconds}
        </div>
    );
};

export default MyTimer;
