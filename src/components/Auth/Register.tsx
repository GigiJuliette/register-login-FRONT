import { userService } from "../../services/api";
import { useState } from "react";

interface UserData {
  nickname: string;
  email: string;
  password: string;
}

interface RegisterProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const Register = ({ setActiveTab }: RegisterProps) => {
  const [userData, setUserData] = useState<UserData>({
    nickname: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [uncorrect, setUncorrect] = useState(false);
  const [formStatus, setFormStatus] = useState("welcome");

  const createUser = async () => {
    if (!userData.nickname || !userData.email || !userData.password) {
      setFormStatus("please fill all fields.");
      return;
    }
    if (userData.password !== confirmPassword) {
      setUncorrect(true);
      setFormStatus("passwords don't match");
      return;
    }
    try {
      await userService.register(userData);
      setFormStatus("register successfull!");
      setUserData({
        nickname: "",
        email: "",
        password: "",
      });
      setConfirmPassword("");
      setTimeout(() => {
        setActiveTab("login");
      }, 1000);
    } catch (error) {
      setFormStatus("registration failed. please try again.");
    }
  };

  return (
    <>
      <form className="authForm registerForm">
        <div data-text="Nickname">
          <input
            type="text"
            value={userData.nickname}
            onChange={(e) => {
              setUserData({ ...userData, nickname: e.target.value });
            }}
          />
        </div>
        <div data-text="Email">
          <input
            type="email"
            value={userData.email}
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
          />
        </div>
        <div data-text="Password">
          <input
            type={seePassword ? "text" : "password"}
            value={userData.password}
            onChange={(e) => {
              setUserData({ ...userData, password: e.target.value });
            }}
          />
        </div>
        <div data-text="Confirm password">
          <input
            type={seePassword ? "text" : "password"}
            value={confirmPassword}
            className={
              uncorrect ? "uncorrectPassword loggin-psw" : "loggin-psw"
            }
            onChange={(e) => {
              setUncorrect(false);
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <button
          type="button"
          className="toggleHide"
          onClick={() => {
            setSeePassword((prev) => !prev);
          }}
        >
          <em>{seePassword ? "hide passwords" : "show passwords"}</em>
        </button>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            createUser();
          }}
        >
          Register
        </button>
        <em className="authStatus">{formStatus}</em>
      </form>
    </>
  );
};
export default Register;
