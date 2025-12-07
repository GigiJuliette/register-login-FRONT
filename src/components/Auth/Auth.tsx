import "./Auth.css";
import { useState } from "react";
import LogIn from "./Login";
import Register from "./Register";
const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  return (
    <>
      <section className="auth-container">
        <div className="authBtn-wrapper">
          <button
            className={
              activeTab === "login"
                ? "activeBtn authBtn glass loginBtn"
                : "authBtn glass loginBtn"
            }
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={
              activeTab === "register"
                ? "activeBtn authBtn glass registerBtn"
                : "authBtn glass registerBtn"
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
      </section>
    </>
  );
};
export default Auth;
