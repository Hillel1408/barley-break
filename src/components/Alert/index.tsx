import { useEffect } from "react";
import classNames from "classnames";
import { useAppSelector, useAppDispatch } from "hook";
import { resetAlert } from "store";

const Alert = () => {
    const alert = useAppSelector((state) => state.main.alert);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const timerId = setTimeout(() => {
            dispatch(resetAlert());
        }, 1500);

        return () => {
            clearInterval(timerId);
        };
    }, [alert.name, dispatch]);

    return alert.name ? (
        <div
            className={classNames(
                "rounded-[4px] px-[10px] py-[15px] text-white z-10 fixed min-w-[250px] top-5 right-5 block",
            )}
            style={{ animation: "fade-in 350ms ease-in-out", backgroundColor: alert.color }}
        >
            {alert.name}
        </div>
    ) : (
        <></>
    );
};

export default Alert;
