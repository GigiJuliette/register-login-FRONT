import { useState } from "react";
import { userService } from "../../services/api";

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
  const [formStatus, setFormStatus] = useState("welcome");
  const [wrongValues, setWrongValues] = useState(false);
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
      console.log(localStorage);
    } catch (error: any) {
      setFormStatus(error.message);
      setWrongValues(true);
    }
  };

  return (
    <>
      <form className="authForm">
        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => {
            setUserData({ ...userData, email: e.target.value });
            setWrongValues(false);
          }}
        />
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
          className="toggleHide"
          onClick={() => {
            setSeePassword((prev) => !prev);
          }}
        >
          <em>{seePassword ? "hide" : "show"}</em>
        </button>
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
        <em className="authStatus">{formStatus}</em>
      </form>
    </>
  );
};
export default LogIn;
