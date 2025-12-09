import { Link } from "react-router";
import "./Landing.css";
const Landing = () => {
  return (
    <>
      <section className="landingSection">
        <h1>Welcome ! </h1>
        <Link to="/dashboard" className=" glass">
          Discover
        </Link>
      </section>
    </>
  );
};
export default Landing;
