import classNames from "classnames";
import { Button, QrModal, Logo } from "components";
import { useEffect, useState } from "react";
import axios from "http/axios";
import { useAppDispatch } from "hook";
import { setDataUser } from "store";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/";

function Login() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [user, setUser] = useState({ name: "", played_before: [""] });

    const [active, setActive] = useState(false);
    const [value, setValue] = useState("");

    const date = new Date().toLocaleDateString("en-ca");

    const dispatch = useAppDispatch();

    useEffect(() => {
        value.length === 6 &&
            (async () => {
                try {
                    setLoading(true);
                    const response = await axios.post("/v1/transactions/third-party-check", {
                        user_id: value,
                        day: date,
                        hash: "#7aSJ!n67%8912sS",
                    });

                    setUser(response.data.data);
                    dispatch(setDataUser({ user_id: value }));
                } catch (e: any) {
                    setError(e.response?.data?.message);
                } finally {
                    setLoading(false);
                }
            })();
    }, [value, date, dispatch]);

    return (
        <>
            <div className="container">
                <div className="py-[73px]">
                    <Logo />
                </div>

                <div className="bg-white rounded-t-[100px] pt-[421px] pb-[96px] px-[220px] flex flex-col items-center gap-[10px] min-h-[1597px]">
                    <span className="text-[#F54D0D] text-[36px] font-bold tracking-[0.72px]">
                        ВВЕДИТЕ СВОЙ ID
                    </span>

                    <div className="relative">
                        <input
                            type="number"
                            disabled
                            value={value}
                            className={classNames(
                                "w-[640px] h-[160px] rounded-[32px] border-2 text-[#000] text-[96px] font-bold text-center",
                                value.length < 6 ? "border-[#F54D0D]" : "border-[#000]",
                            )}
                        />

                        <svg
                            className="h-[72px] w-[85px] absolute top-1/2 -translate-y-1/2 -right-[107px] cursor-pointer fill-black duration-200 active:fill-[#8D1BFF]"
                            aria-hidden="true"
                            onClick={() => {
                                setValue((prev) => prev.slice(0, -1));
                                error && setError("");
                            }}
                        >
                            <use xlinkHref="/sprites/sprite.svg#delete"></use>
                        </svg>
                    </div>

                    <span
                        className="text-[#000] text-[32px] font-bold cursor-pointer"
                        onClick={() => {
                            setActive(true);
                        }}
                    >
                        У меня пока нет ID
                    </span>

                    {value.length < 6 ? (
                        <div className="mt-[55px] grid grid-cols-[1fr_1fr_1fr] gap-9">
                            {new Array(10).fill("").map((item, index) => (
                                <button
                                    key={index}
                                    className={classNames(
                                        "w-[160px] h-[160px] rounded-full border-2 border-[#8D1BFF] flex items-center justify-center text-[80px] font-bold text-[#000] duration-200 active:bg-[#70F] active:text-white cursor-pointer disabled:cursor-default disabled:active:text-[#000] disabled:active:bg-[white]",
                                        index === 0 && "order-1 col-start-2",
                                    )}
                                    onClick={() => {
                                        setValue((prev) => prev + index);
                                    }}
                                    disabled={value.length === 6}
                                >
                                    {index}
                                </button>
                            ))}
                        </div>
                    ) : loading ? (
                        <div className="mt-[230px] flex flex-col gap-8 items-center">
                            <svg className="h-[180px] w-[178px]" aria-hidden="true">
                                <use xlinkHref="/sprites/sprite.svg#search"></use>
                            </svg>

                            <span className="text-[#000] text-[32px] font-bold">Идет поиск...</span>
                        </div>
                    ) : error ? (
                        <div className="mt-[230px] flex flex-col gap-8 items-center">
                            <svg className="h-[180px] w-[198px]" aria-hidden="true">
                                <use xlinkHref="/sprites/sprite.svg#error"></use>
                            </svg>

                            <span className="text-[#F40A0A] text-[32px] font-bold text-center">
                                Пользователь с таким ID не найден! Проверьте, что введен правильный
                                код
                            </span>
                        </div>
                    ) : (
                        <div className="mt-[60px] flex flex-col gap-[20px] items-center">
                            <Button
                                text="СЛОЖНАЯ ИГРА"
                                className="w-[640px] bg-[#00B23C]"
                                disabled={user.played_before.includes("puzzle_3x3")}
                                clickHandler={() => {
                                    dispatch(setDataUser({ id: "puzzle_3x3" }));
                                    navigate(ROUTES.GAME);
                                }}
                            />

                            <Button
                                text="ПРОСТАЯ ИГРА"
                                className="w-[640px] bg-[#00B23C]"
                                disabled={user.played_before.includes("puzzle_3x2")}
                                clickHandler={() => {
                                    dispatch(setDataUser({ id: "puzzle_3x2" }));
                                    navigate(ROUTES.GAME);
                                }}
                            />

                            <p
                                className={classNames(
                                    "text-[32px] font-bold text-center -mx-[100px] mt-[32px]",
                                    user.played_before.length === 2
                                        ? "text-[#F40A0A]"
                                        : "text-[#000]",
                                )}
                            >
                                {user.played_before.length === 0 &&
                                    `Выберите уровень сложности игры, ${user.name}. У вас будет 3 минуты, чтобы собрать картинку из фрагментов`}

                                {user.played_before.length === 1 &&
                                    `${user.name}, вы уже прошли одну из игр. Теперь вы можете заработать дополнительные баллы, сыграв во вторую.`}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <QrModal active={active} setActive={setActive} />
        </>
    );
}

export default Login;
