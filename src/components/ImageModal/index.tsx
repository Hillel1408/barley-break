import { createPortal } from "react-dom";
import { LayoutModal, Button } from "components";

const ImageModal = ({
    active,
    setActive,
    image,
    difficulty,
}: {
    active: boolean;
    setActive: (a: boolean) => void;
    image: number;
    difficulty: string;
}) => {
    active && document.body.classList.add("lock");

    return createPortal(
        <LayoutModal
            className="w-[988px] px-[94px] pt-[90px] pb-[96px]"
            closeModal={() => {
                setActive(false);
            }}
            active={active}
        >
            <div className="flex flex-col gap-[63px]">
                <img src={`/images/${image}/${difficulty}/full.webp`} alt="" />

                <Button
                    text="ПОНЯТНО"
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

export default ImageModal;
