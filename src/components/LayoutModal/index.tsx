import classNames from "classnames";
import { LayoutModalProps } from "components/LayoutModal/LayoutModal.props";

const LayoutModal = ({ children, closeModal, active, className }: LayoutModalProps) => {
    return (
        <div
            className={classNames(
                "fixed top-0 w-full h-full bg-[rgba(0,0,0,0.70)] overflow-auto z-20",
                active ? "visible opacity-100" : "invisible opacity-0",
            )}
            onClick={() => {
                closeModal();
                document.body.classList.remove("lock");
            }}
        >
            <div className="py-5 flex items-center justify-center min-h-full">
                <div
                    className={classNames(
                        "bg-white rounded-[32px] relative overflow-hidden",
                        className,
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default LayoutModal;
