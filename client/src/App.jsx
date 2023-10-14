import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/Login";
import Signup from "./components/Signup";
import Activate from "./components/Activate";
import SignupInstruction from "./components/SignupInstruction";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api">
          <Route path="/api/login" element={<SignIn />} />
          <Route path="/api/signup" element={<Signup />} />
          <Route path="/api/instruction" element={<SignupInstruction />} />
          <Route path="/api/account-activate/:token" element={<Activate />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
