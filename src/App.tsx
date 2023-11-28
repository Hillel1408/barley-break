import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "constants/";
import { Main, Login } from "pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={`${ROUTES.HOME}`} element={<Main />} />
        <Route path={`${ROUTES.LOGIN}`} element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
