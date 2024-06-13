import Reg from "./components/login/reg";
import Log from "./components/login/log";
import Home from "./components/main/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={currentUser ? <Home /> : <Log />} />
          <Route path="login" element={<Log />} />
          <Route path="register" element={<Reg />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
