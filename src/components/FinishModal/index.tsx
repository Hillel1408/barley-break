import { createPortal } from "react-dom";
import { LayoutModal, Button } from "components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/";

const FinishModal = ({
    active,
    setActive,
}: {
    active: boolean;
    setActive: (a: boolean) => void;
}) => {
    const navigate = useNavigate();

    active && document.body.classList.add("lock");

    return createPortal(
        <LayoutModal
            className="w-[988px] px-[94px] pt-[109px] pb-[83px]"
            closeModal={() => {
                setActive(false);
            }}
            active={active}
        >
            <div className="text-center">
                <h2 className="text-[#F54D0D] text-[80px] font-bold mb-[105px]">Вы уверены?</h2>

                <Button
                    text="ЗАВЕРШИТЬ ИГРУ"
                    className="bg-[#F40A0A] w-full"
                    clickHandler={() => {
                        navigate(ROUTES.LOGIN);
                        document.body.classList.remove("lock");
                    }}
                />

                <button
                    className="text-[#F54D0D] text-[32px] font-bold mt-[46px]"
                    onClick={() => {
                        setActive(false);
                        document.body.classList.remove("lock");
                    }}
                >
                    Отменить
                </button>
            </div>
        </LayoutModal>,
        document.getElementById("portal") as HTMLElement,
    );
};

export default FinishModal;
