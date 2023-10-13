import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api">
          <Route path="/api/login" element={<SignIn />} />
          <Route path="/api/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
