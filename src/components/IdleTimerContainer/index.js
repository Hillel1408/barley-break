import { useRef } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/";

export default function IdleTimerContainer() {
    const navigate = useNavigate();

    const idleTimeRef = useRef(null);

    const onIdle = () => {
        navigate(ROUTES.HOME);
    };

    const idleTimer = useIdleTimer({
        crossTab: true,
        ref: idleTimeRef,
        timeout: 60 * 1000,
        onIdle: onIdle,
    });

    return <div idleTimer={idleTimer}></div>;
}
