import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/";

const Logo = () => {
    const navigate = useNavigate();

    return (
        <img
            className="cursor-pointer ml-[76px]"
            src="/images/logo.svg"
            alt=""
            onClick={() => {
                navigate(ROUTES.HOME);
            }}
        />
    );
};

export default Logo;
