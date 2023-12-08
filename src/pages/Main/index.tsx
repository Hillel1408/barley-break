import { useNavigate } from "react-router-dom";
import { Logo, Alert } from "components";
import { ROUTES } from "constants/";

function Main() {
    const navigate = useNavigate();

    return (
        <>
            <div className="container">
                <div className="py-[73px]">
                    <Logo />
                </div>

                <div
                    className="relative min-h-[1597px] cursor-pointer rounded-t-[100px] overflow-hidden"
                    onClick={() => {
                        navigate(ROUTES.LOGIN);
                    }}
                >
                    <video autoPlay loop muted playsInline className="relative z-10">
                        <source src="/video/VID_20231201_122949_907.mp4" type="video/mp4" />
                    </video>

                    <div className="absolute bottom-[158px] left-0 right-0 text-center flex flex-col gap-[70px] items-center z-30">
                        <svg className="h-[210px] w-[177px]" aria-hidden="true">
                            <use xlinkHref="/sprites/sprite.svg#hand"></use>
                        </svg>

                        <span className="text-white text-[80px] font-bold">
                            Коснитесь экрана, <br /> чтобы начать игру
                        </span>
                    </div>

                    <div
                        className="absolute h-full w-full top-0 z-20"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.70) 63.37%)",
                        }}
                    ></div>
                </div>
            </div>

            <Alert />
        </>
    );
}

export default Main;
