import { Link } from "react-router";
import "./ErrorPage.css";
const ErrorPage = () => {
  return (
    <section className="errorSection">
      <em>ERROR</em>
      <h1>404</h1>
      <div>
        <em>You should go back to </em>
        <Link to="/dashboard" className="glass regularBtn">
          somewhere safe
        </Link>
      </div>
    </section>
  );
};
export default ErrorPage;
