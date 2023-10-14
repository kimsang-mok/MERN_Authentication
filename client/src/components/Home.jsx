import { Link } from "react-router-dom";
import { isAuth, signout } from "../helpers/userInfo";
import { useNavigate } from "react-router-dom";

function Home() {
  const isAuthenticated = !!isAuth();
  const user = isAuth();
  const navigate = useNavigate();
  const redirect = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>HELLO WORLD</h1>
      {!isAuthenticated ? (
        <>
          <Link to={"/api/signup"}>Sign Up</Link>
          <Link to={"/api/login"}>Log in</Link>
        </>
      ) : (
        <>
          <h1>Hello {user.username}</h1>
          <span onClick={() => signout(redirect)}>Signout</span>
        </>
      )}
    </div>
  );
}

export default Home;
