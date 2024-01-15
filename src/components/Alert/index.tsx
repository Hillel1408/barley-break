import { useEffect } from "react";
import classNames from "classnames";
import { useAppSelector, useAppDispatch } from "hook";
import { resetAlert } from "store";

const Alert = () => {
    const alert = useAppSelector((state) => state.main.alert);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const timerId = setTimeout(() => {
            alert.name === "Соединение восстановлено" && dispatch(resetAlert());
        }, 1500);

        return () => {
            clearInterval(timerId);
        };
    }, [alert.name, dispatch]);

    return alert.name ? (
        <div
            className={classNames("text-white z-20 fixed w-full top-0 h-20 flex items-center justify-center text-[32px] font-bold")}
            style={{ backgroundColor: alert.color }}
        >
            {alert.name}
        </div>
    ) : (
        <></>
    );
};

export default Alert;
