import classNames from "classnames";

const Button = ({
  text,
  disabled,
  className,
  clickHandler,
}: {
  text: string;
  disabled?: boolean;
  className?: string;
  clickHandler?: () => void;
}) => {
  return (
    <button
      disabled={disabled}
      className={classNames(
        "h-[160px] rounded-[32px] text-white text-[64px] font-bold tracking-[1.28px] disabled:bg-[#95999C]",
        className
      )}
      onClick={clickHandler}
    >
      {text}
    </button>
  );
};

export default Button;
