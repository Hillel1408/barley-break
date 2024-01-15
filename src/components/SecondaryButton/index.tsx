import classNames from "classnames";

const SecondaryButton = ({
    text,
    className,
    children,
    clickHandler,
}: {
    text: string;
    className?: string;
    children?: JSX.Element;
    clickHandler?: () => void;
}) => {
    return (
        <button className={classNames("text-[32px] font-bold flex items-center gap-[11px]", className)} onClick={clickHandler}>
            {children}
            {text}
        </button>
    );
};

export default SecondaryButton;
