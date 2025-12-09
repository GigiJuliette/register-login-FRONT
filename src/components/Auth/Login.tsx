import { useState } from "react";
import { userService } from "../../services/api";
import { useNavigate } from "react-router";

interface UserData {
  nickname: string;
  email: string;
  password: string;
}

const LogIn = () => {
  const [userData, setUserData] = useState<UserData>({
    nickname: "",
    email: "",
    password: "",
  });
  const [seePassword, setSeePassword] = useState(false);
  const [formStatus, setFormStatus] = useState("Happy to see you again !");
  const [wrongValues, setWrongValues] = useState(false);
  const navigate = useNavigate();

  const loginHandler = async () => {
    if (!userData.email || !userData.password) {
      setFormStatus("please fill all fields.");
      return;
    }
    try {
      const response = await userService.getToken(userData);
      localStorage.setItem("token", response.token);
      setUserData({
        nickname: "",
        email: "",
        password: "",
      });
      setFormStatus(response.message);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error: any) {
      setFormStatus(error.message);
      setWrongValues(true);
    }
  };

  return (
    <>
      <form className="authForm loginForm">
        <h2>{formStatus}</h2>
        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => {
            setUserData({ ...userData, email: e.target.value });
            setWrongValues(false);
          }}
        />
        <div className="loggin-psw">
          <input
            type={seePassword ? "text" : "password"}
            placeholder="Password"
            value={userData.password}
            onChange={(e) => {
              setUserData({ ...userData, password: e.target.value });
              setWrongValues(false);
            }}
          />
          <button
            type="button"
            className="toggleHide login-toggleHide"
            onClick={() => {
              setSeePassword((prev) => !prev);
            }}
          >
            <em>{seePassword ? "hide" : "show"}</em>
          </button>
        </div>
        <button
          type="submit"
          className={wrongValues ? "uncorrectLoggin" : ""}
          onClick={(e) => {
            e.preventDefault();
            loginHandler();
          }}
        >
          Log In
        </button>
      </form>
    </>
  );
};
export default LogIn;
