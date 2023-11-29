import classNames from "classnames";
import { SecondaryButton, Button, ImageModal, FinishModal } from "components";
import { useEffect, useState } from "react";

function Game() {
    const win = false;
    let timer = "03:00";

    const [active, setActive] = useState(false);
    const [activeModal, setActiveModal] = useState(false);

    const length = 6;

    const chunkArray = (arr: number[], cnt: number) =>
        arr.reduce(
            (prev: number[][], cur: number, i: number, a: number[]) =>
                !(i % cnt) ? prev.concat([a.slice(i, i + cnt)]) : prev,
            [],
        );

    const generateArray = (length: number) => {
        const values = [...Array(length)].map((_, i) => i + 1);
        const result = [...Array(length)].map(
            () => values.splice(Math.floor(Math.random() * values.length), 1)[0],
        );
        return chunkArray(result, 3);
    };

    return (
        <>
            <div className="container">
                <div className="py-[73px] flex justify-between items-center">
                    <img src="/images/logo.svg" alt="" />

                    {!win && (
                        <div className="bg-[#F54D0D] text-white text-[80px] font-bold px-6">
                            {timer}
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-t-[100px] pt-[107px] pb-[80px] px-[141px] flex flex-col items-center gap-[10px] min-h-[1597px]">
                    <div className="relative w-full text-center">
                        <h1
                            className={classNames(
                                "text-[80px] font-bold mb-[329px]",
                                win
                                    ? "text-[#00B23C]"
                                    : timer === "00:00"
                                    ? "text-[#F40A0A]"
                                    : "text-[#000]",
                            )}
                        >
                            {win
                                ? "Победа!"
                                : timer === "00:00"
                                ? "Время вышло"
                                : "Соберите картинку"}
                        </h1>

                        <p className="absolute top-[130px] text-[36px] text-[#000] font-bold left-0 right-0">
                            {win
                                ? "Поздравляем, %username%! Вы верно собрали картинку"
                                : timer === "00:00" &&
                                  "В следующий раз, попробуйте действовать быстрее"}
                        </p>
                    </div>

                    <div
                        className={classNames(
                            "grid grid-cols-[1fr_1fr_1fr] mb-[226px] border-[0.5px] border-[#000]",
                            win && "border-8 border-[#00B23C] rounded-[6px]",
                        )}
                    >
                        {generateArray(length).map((arr) =>
                            arr.map((item) => (
                                <div
                                    key={item}
                                    className="w-[268px] h-[268px] border-[0.5px] border-[#000]"
                                >
                                    <img src={`/images/1/3x2/${item}.jpeg`} alt="" />
                                </div>
                            )),
                        )}
                    </div>

                    {win ? (
                        <Button text="ПОЛУЧИТЬ КУПОНЫ" className="w-[802px] bg-[#00B23C]" />
                    ) : timer === "00:00" ? (
                        <Button text="ЗАВЕРШИТЬ ИГРУ" className="w-[802px] bg-[#F40A0A]" />
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

            <ImageModal active={active} setActive={setActive} />

            <FinishModal active={activeModal} setActive={setActiveModal} />
        </>
    );
}

export default Game;
