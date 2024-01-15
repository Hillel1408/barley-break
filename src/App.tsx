import { useEffect } from "react";
import { useAppDispatch } from "hook";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "constants/";
import { Main, Login, Game } from "pages";
import { setAlert } from "store";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        window.addEventListener("online", () => dispatch(setAlert({ name: "Соединение восстановлено", color: "#00B23C" })));
        window.addEventListener("offline", () => dispatch(setAlert({ name: "Соединение прервано", color: "#F40A0A" })));
    }, []);

    return (
        <Router>
            <Routes>
                <Route path={`${ROUTES.HOME}`} element={<Main />} />
                <Route path={`${ROUTES.LOGIN}`} element={<Login />} />
                <Route path={`${ROUTES.GAME}`} element={<Game />} />
                <Route path="*" element={<Main />} />
            </Routes>
        </Router>
    );
}

export default App;
