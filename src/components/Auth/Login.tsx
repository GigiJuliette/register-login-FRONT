import { useState, useContext } from "react";
import { userService } from "../../services/api";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/userProvider";

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
  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState("Happy to see you again !");
  const [uncorrect, setUncorrect] = useState(false);
  const navigate = useNavigate();
  const { refreshUser } = useContext(UserContext);

  const loginHandler = async () => {
    if (!userData.email || !userData.password) {
      setFormStatus("Please fill all fields.");
      setLoading(true);
      setUncorrect(true);
      return;
    }
    try {
      setLoading(true);
      const response = await userService.getToken(userData);
      localStorage.setItem("token", response.token);
      await refreshUser();
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
      setUncorrect(true);
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
            setUncorrect(false);
            setLoading(false);
          }}
        />
        <div className="loggin-psw">
          <input
            type={seePassword ? "text" : "password"}
            placeholder="Password"
            value={userData.password}
            onChange={(e) => {
              setUserData({ ...userData, password: e.target.value });
              setUncorrect(false);
              setLoading(false);
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
          disabled={loading}
          type="submit"
          className={uncorrect ? "uncorrectLoggin" : ""}
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
