import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "constants/";
import { Main, Login, Game } from "pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={`${ROUTES.HOME}`} element={<Main />} />
        <Route path={`${ROUTES.LOGIN}`} element={<Login />} />
        <Route path={`${ROUTES.GAME}`} element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
