import "./Dashboard.css";
import { useState } from "react";
import UsersList from "../../components/UsersList/UsersList";
import EditProfile from "../../components/EditProfile/EditProfile";
import LogOut from "../../components/LogOut/LogOut";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("");

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

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
          <defs>
            <filter id="shadow">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="1.5"
                floodColor="#000"
              />
            </filter>
          </defs>
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
          onClick={() => {
            setCurrentSection("update");
          }}
        >
          Edit profile
        </li>
        <li
          onClick={() => {
            setCurrentSection("users");
          }}
        >
          All users
        </li>
        <div className="navLine" />
        <li>Get in touch</li>
        <div className="navLine" />
        <li>Documentation</li>
        <li
          onClick={() => {
            setCurrentSection("logout");
          }}
        >
          Log out
        </li>
      </ul>
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
