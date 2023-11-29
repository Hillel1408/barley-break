import { createPortal } from "react-dom";
import { LayoutModal, Button } from "components";

const QrModal = ({ active, setActive }: { active: boolean; setActive: (a: boolean) => void }) => {
    active && document.body.classList.add("lock");

    return createPortal(
        <LayoutModal
            className="w-[988px] px-[94px] pt-[69px] pb-[101px]"
            closeModal={() => {
                setActive(false);
            }}
            active={active}
        >
            <div className="flex flex-col gap-[58px]">
                <p className="text-[#000] text-[32px] font-bold text-center">
                    Зарегистрируйтесь на платформе, отсканировав QR код, зарабатывайте купоны и
                    выигрывайте призы.
                </p>

                <img src="/images/qr.jpg" alt="" />

                <Button
                    text="ЗАКРЫТЬ"
                    className="bg-[#8D1BFF]"
                    clickHandler={() => {
                        setActive(false);
                        document.body.classList.remove("lock");
                    }}
                />
            </div>
        </LayoutModal>,
        document.getElementById("portal") as HTMLElement,
    );
};

export default QrModal;
