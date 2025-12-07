import "./Auth.css";
import { useState } from "react";
import LogIn from "./Login";
import Register from "./Register";
const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  return (
    <>
      <div>
        <div className="authBtn-wrapper">
          <button
            className={
              activeTab === "login" ? "activeBtn glass" : "authBtn glass"
            }
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={
              activeTab === "register" ? "activeBtn glass" : "authBtn glass"
            }
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>
        <div className="authComponent-wrapper glass">
          {activeTab === "login" ? (
            <LogIn />
          ) : (
            <Register setActiveTab={setActiveTab} />
          )}
        </div>
      </div>
    </>
  );
};
export default Auth;
