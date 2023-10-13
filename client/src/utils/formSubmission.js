import axios from "./api";

const usernameCheck = (username) => {
  if (username.length < 4) {
    return false;
  }
  const regex = /^[A-Za-z0-9_]+$/;
  return regex.test(username);
};

const emailCheck = (email) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return regex.test(email);
};

export const handleSignup = async (
  event,
  setIsUsernameValid,
  setIsEmailValid,
  setIsPasswordValid,
  setIsEmailExist
) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const username = data.get("username");
  const email = data.get("email");
  const password = data.get("password");

  const usernameResult = usernameCheck(username);
  const emailResult = emailCheck(email);
  const passwordResult = password.length >= 8;

  setIsUsernameValid(usernameResult);
  setIsEmailValid(emailResult);
  setIsPasswordValid(passwordResult);
  setIsEmailExist(false);

  if (usernameResult && emailResult && passwordResult) {
    const user = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post("/api/signup/", user);
      console.log(response);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setIsEmailExist(true);
        console.log("Email is already exist");
      } else {
        console.error("Error signing up:", err);
      }
    }
  }
};

export const handleLogin = async (
  event,
  setIsEmailValid,
  setIsEmailExist,
  setIsPasswordCorrect
) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const email = data.get("email");
  const password = data.get("password");
  const emailResult = emailCheck(email);
  setIsEmailValid(emailResult);

  if (!emailResult) {
    console.log("Please enter a valid email");
    return;
  }

  try {
    const response = await axios.post("/api/login", { email, password });
    setIsPasswordCorrect(true);
    console.log(response);
  } catch (err) {
    if (err.response.status === 401) {
      if (err.response.data.exists) {
        setIsEmailExist(true);
        setIsPasswordCorrect(false);
        console.log("Incorrect password");
      } else {
        setIsEmailExist(false);
        setIsPasswordCorrect(true);
        console.log("Email does not exist");
      }
    } else {
      console.log(err);
    }
  }
};
