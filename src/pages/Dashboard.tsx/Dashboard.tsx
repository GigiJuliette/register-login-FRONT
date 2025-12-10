import "./Dashboard.css";
import { useState, useContext, useEffect } from "react";
import UsersList from "../../components/UsersList/UsersList";
import EditProfile from "../../components/EditProfile/EditProfile";
import LogOut from "../../components/LogOut/LogOut";
import { UserContext } from "../../context/userProvider";
import IconProfile from "../../components/IconProfile/IconProfile";
import { useNavigate } from "react-router";
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    //There is real token verification in the backend (see services/api.ts and backend /middleware/auth.js)
    //this is just in case someone's token expire or does not have token and go to /dashboard url.
    const token = localStorage.getItem("token");
    if (!token || token === "") {
      navigate("/authentication");
    }
  }, [navigate]);
  return (
    <>
      <div className="burgerNav">
        <svg
          id="burgerToggle"
          className={isOpen ? "ham open ham-isOpen" : "ham"}
          viewBox="0 0 100 100"
          width="80"
          onClick={toggleMenu}
          style={{ cursor: "pointer" }}
        >
          <path
            className="line top"
            d="m 30,33 h 40 c 13.100415,0 14.380204,31.80258 6.899646,33.421777 -24.612039,5.327373 9.016154,-52.337577 -12.75751,-30.563913 l -28.284272,28.284272"
          />
          <path
            className="line middle"
            d="m 70,50 c 0,0 -32.213436,0 -40,0 -7.786564,0 -6.428571,-4.640244 -6.428571,-8.571429 0,-5.895471 6.073743,-11.783399 12.286435,-5.570707 6.212692,6.212692 28.284272,28.284272 28.284272,28.284272"
          />
          <path
            className="line bottom"
            d="m 69.575405,67.073826 h -40 c -13.100415,0 -14.380204,-31.80258 -6.899646,-33.421777 24.612039,-5.327373 -9.016154,52.337577 12.75751,30.563913 l 28.284272,-28.284272"
          />
        </svg>
      </div>

      <ul
        className={isOpen ? "burgerMenu openBurger glass" : "burgerMenu glass"}
      >
        <li
          tabIndex={0}
          role="button"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.currentTarget.click();
            }
          }}
          onClick={() => {
            setCurrentSection("");
            toggleMenu();
          }}
        >
          <IconProfile
            iconIndex={user.profileIcon_id || 0}
            className={"profileIcon-nav glass"}
          />
        </li>
        <li
          tabIndex={0}
          role="button"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.currentTarget.click();
            }
          }}
          onClick={() => {
            setCurrentSection("update");
            toggleMenu();
          }}
        >
          My profile
        </li>
        <li
          tabIndex={0}
          role="button"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.currentTarget.click();
            }
          }}
          onClick={() => {
            setCurrentSection("users");
            toggleMenu();
          }}
        >
          Users list
        </li>
        <div className="navLine" />
        <li>
          <a
            href="https://github.com/GigiJuliette/register-login-FRONT"
            target="_blank"
            rel="noreferrer"
          >
            Documentation
          </a>
        </li>
        <div className="navLine" />
        <li>
          <a href="mailto:gigialiasjuliette@gmail.com">Get in touch</a>
        </li>
        <li
          tabIndex={0}
          role="button"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.currentTarget.click();
            }
          }}
          onClick={() => {
            setCurrentSection("logout");
            toggleMenu();
          }}
        >
          Log out
        </li>
      </ul>
      {currentSection === "" && (
        <section>
          <h1>Welcome {user.nickname} !</h1>
        </section>
      )}
      {currentSection === "users" && (
        <section>
          <UsersList />
        </section>
      )}
      {currentSection === "update" && (
        <section>
          <EditProfile />
        </section>
      )}
      {currentSection === "logout" && (
        <section>
          <LogOut setCurrentSection={setCurrentSection} />
        </section>
      )}
    </>
  );
};
export default Dashboard;
