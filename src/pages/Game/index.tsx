import { useEffect, useState, useRef, useCallback } from "react";
import classNames from "classnames";
import {
    SecondaryButton,
    Button,
    ImageModal,
    FinishModal,
    Logo,
    IdleTimerContainer,
} from "components";
import { useTimer } from "react-timer-hook";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/";
import { useAppSelector } from "hook";
import axios from "http/axios";
import { correctArr, generateArray, isWin } from "pages/Game/helpers";

function Game() {
    const navigate = useNavigate();

    const userData = useAppSelector((state) => state.main.userData);

    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 180);

    const { seconds, minutes, pause } = useTimer({
        expiryTimestamp,
        onExpire: () => console.warn("onExpire called"),
    });

    const [active, setActive] = useState(false);
    const [activeModal, setActiveModal] = useState(false);
    const [win, setWin] = useState(false);

    const [arr, setArr] = useState<number[][]>([[]]);

    const length = +(userData.id === "puzzle_3x3" ? 9 : 6);

    const number = useRef(Math.floor(1 + Math.random() * length)); //часть картинки которую пропускаем

    const image = useRef(Math.floor(1 + Math.random() * 4)); //рандомная картинка

    const division = ["Тарасова", "Чернышева", "Боброва", "Харламова"];

    const getCoupons = async () => {
        try {
            const response = await axios.post("/v1/transactions/third-party", {
                id: userData.id,
                day: new Date().toLocaleDateString("en-ca"),
                user_id: userData.user_id,
                hash: `${process.env.REACT_APP_HASH}`,
            });
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    };

    const formatTime = (time: number) => {
        return String(time).padStart(2, "0");
    };

    useEffect(() => {
        setArr(generateArray(length));
    }, [length]);

    const onClose = true;

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Escape" && onClose) {
                length === 9
                    ? setArr([
                          [1, 2, 3],
                          [4, 5, 6],
                          [7, 8, 9],
                      ])
                    : setArr([
                          [1, 2, 3],
                          [4, 5, 6],
                      ]);
            }
        },
        [onClose],
    );

    useEffect(() => {
        document.addEventListener<"keydown">("keydown", handleKeyDown, false);

        return () => {
            document.removeEventListener<"keydown">("keydown", handleKeyDown, false);
        };
    }, [handleKeyDown]);

    return (
        <>
            <IdleTimerContainer></IdleTimerContainer>

            {userData.user_id ? (
                <div>
                    <div className="container">
                        <div className="py-[73px] flex justify-between items-center">
                            <Logo />

                            {!win && (
                                <div className="bg-[#F54D0D] text-white text-[80px] font-bold w-[276px] text-center">
                                    {formatTime(minutes)}:{formatTime(seconds)}
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-t-[100px] pt-[107px] pb-[80px] px-[141px] flex flex-col items-center gap-[10px] min-h-[1597px]">
                            <div className="relative w-full text-center">
                                <h1
                                    className={classNames(
                                        "text-[80px] font-bold",
                                        userData.id === "puzzle_3x3" ? "mb-[235px]" : "mb-[329px]",
                                        win
                                            ? "text-[#00B23C]"
                                            : seconds === 0 && minutes === 0
                                            ? "text-[#F40A0A]"
                                            : "text-[#000]",
                                    )}
                                >
                                    {win
                                        ? "Победа!"
                                        : seconds === 0 && minutes === 0
                                        ? "Время вышло"
                                        : "Соберите картинку"}
                                </h1>

                                <p className="absolute top-[130px] text-[36px] text-[#000] font-bold left-0 right-0">
                                    {win
                                        ? `Поздравляем, ${userData.name}! Вы верно собрали картинку`
                                        : seconds === 0 &&
                                          minutes === 0 &&
                                          "В следующий раз, попробуйте действовать быстрее"}
                                </p>
                            </div>

                            <div
                                className={classNames(
                                    "grid grid-cols-[1fr_1fr_1fr] mb-2 border-[0.5px] border-[#000]",
                                    win && "outline outline-8 outline-[#00B23C] rounded-[4px]",
                                    seconds === 0 &&
                                        minutes === 0 &&
                                        "outline outline-8 outline-[#F40A0A] rounded-[4px]",
                                )}
                            >
                                {arr &&
                                    arr.map((array, i) =>
                                        array.map((item, j) => (
                                            <div
                                                key={item}
                                                className={classNames(
                                                    "group w-[268px] h-[268px] border-[0.5px] border-[#000] relative",
                                                )}
                                                onClick={() => {
                                                    if (!win && !(seconds === 0 && minutes === 0)) {
                                                        correctArr(
                                                            i,
                                                            j,
                                                            arr,
                                                            number.current,
                                                            setArr,
                                                        );

                                                        if (isWin(arr)) {
                                                            pause();
                                                            setWin(true);
                                                            getCoupons();
                                                        }
                                                    }
                                                }}
                                            >
                                                {(item !== number.current || win) && (
                                                    <img
                                                        src={`/images/${image.current}/${userData.id}/${item}.webp`}
                                                        alt=""
                                                    />
                                                )}
                                                <div
                                                    className={classNames(
                                                        "absolute left-0 right-0 top-0 bottom-0 duration-100 opacity-0",
                                                        !(seconds === 0 && minutes === 0) &&
                                                            "group-active:opacity-100",
                                                    )}
                                                    style={{
                                                        background:
                                                            "linear-gradient(0deg, rgba(141, 27, 255, 0.50) 0%, rgba(141, 27, 255, 0.50) 100%)",
                                                    }}
                                                ></div>
                                            </div>
                                        )),
                                    )}
                            </div>

                            <p className="mb-[226px] text-[#000] text-[16px] font-bold text-center">
                                Дивизион {division[image.current - 1]} Фонбет Неделя звезд хоккея
                                2022. Мастер-шоу КХЛ <br /> 10 Декабря 2022 г. Челябинск, ЛА Трактор
                            </p>

                            {win ? (
                                <Button
                                    text="ПОЛУЧИТЬ КУПОНЫ"
                                    className="w-[802px] bg-[#00B23C]"
                                    clickHandler={() => {
                                        navigate(ROUTES.HOME);
                                    }}
                                />
                            ) : seconds === 0 && minutes === 0 ? (
                                <Button
                                    text="ЗАВЕРШИТЬ ИГРУ"
                                    className="w-[802px] bg-[#F40A0A]"
                                    clickHandler={() => {
                                        navigate(ROUTES.HOME);
                                    }}
                                />
                            ) : (
                                <div className="flex justify-between w-full">
                                    <SecondaryButton
                                        text="Смотреть подсказку"
                                        className="text-[#8D1BFF]"
                                        clickHandler={() => {
                                            setActive(true);
                                        }}
                                    >
                                        <svg className="h-[33px] w-[33px]" aria-hidden="true">
                                            <use xlinkHref="/sprites/sprite.svg#help"></use>
                                        </svg>
                                    </SecondaryButton>

                                    <SecondaryButton
                                        text="Завершить игру"
                                        className="text-[#F40A0A]"
                                        clickHandler={() => {
                                            setActiveModal(true);
                                        }}
                                    >
                                        <svg className="h-[33px] w-[33px]" aria-hidden="true">
                                            <use xlinkHref="/sprites/sprite.svg#finish"></use>
                                        </svg>
                                    </SecondaryButton>
                                </div>
                            )}
                        </div>
                    </div>

                    <ImageModal
                        active={active}
                        setActive={setActive}
                        image={image.current}
                        difficulty={userData.id}
                    />

                    <FinishModal active={activeModal} setActive={setActiveModal} />
                </div>
            ) : (
                navigate(ROUTES.HOME)
            )}
        </>
    );
}

export default Game;
