import classNames from "classnames";

const SecondaryButton = ({
  text,
  className,
  children,
}: {
  text: string;
  className?: string;
  children?: JSX.Element;
}) => {
  return (
    <button
      className={classNames(
        "text-[32px] font-bold flex items-center gap-[11px]",
        className
      )}
    >
      {children}
      {text}
    </button>
  );
};

export default SecondaryButton;
