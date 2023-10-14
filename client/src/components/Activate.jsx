import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/api";

function decodeHyphenToDot(inputString) {
  return inputString.replace(/-/g, ".");
}

function Activate() {
  const [name, setName] = useState("");
  // const [token, setToken] = useState("");
  const [show, setShow] = useState(true);
  const { token } = useParams();
  const decodedToken = decodeHyphenToDot(token);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/account-activate", {
        token: decodedToken,
      });

      console.log("Signup Success", response);
    } catch (err) {
      console.error("Signup error", err.response.data);
    }
  };

  const activationLink = () => {
    return (
      <div>
        <h1>Hey {name}, Ready to activate your account</h1>
        <button onClick={handleSubmit}>Acctivate Account</button>
      </div>
    );
  };

  useEffect(() => {
    console.log(decodedToken);
  }, []);

  return (
    <>
      <h1>Activate Account</h1>
      {activationLink()}
    </>
  );
}

export default Activate;
