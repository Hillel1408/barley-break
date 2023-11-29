import { createPortal } from "react-dom";
import { LayoutModal, Button } from "components";

const ImageModal = ({
  active,
  setActive,
}: {
  active: boolean;
  setActive: (a: boolean) => void;
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
        <img src="/images/1/3x2/full.jpeg" alt="" />

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
    document.getElementById("portal") as HTMLElement
  );
};

export default ImageModal;
