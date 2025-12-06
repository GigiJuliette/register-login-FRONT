import "./Auth.css";
import { useState } from "react";
import LogIn from "./Login";
import Register from "./Register";
const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  return (
    <>
      <div className="authBtn-wrapper">
        <button
          className={activeTab === "login" ? "activeBtn" : "authBtn"}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          className={activeTab === "register" ? "activeBtn" : "authBtn"}
          onClick={() => setActiveTab("register")}
        >
          Register
        </button>
      </div>
      <div className="authComponent-wrapper">
        {activeTab === "login" ? <LogIn /> : <Register />}
      </div>
    </>
  );
};
export default Auth;
