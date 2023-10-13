import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>HELLO WORLD</h1>
      <Link to={"/api/signup"}>Sign Up</Link>
      <Link to={"/api/login"}>Log in</Link>
    </div>
  );
}

export default Home;
