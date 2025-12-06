import "./Register.css";
import { userService } from "../../services/api";
import { useState } from "react";

const Register = () => {
  const [userData, setUserData] = useState({
    nickname: "",
    email: "",
  });

  const createUser = async () => {
    console.log(userData);
    await userService.register(userData);
    console.log("yes");
  };

  return (
    <>
      <form>
        <input
          type="text"
          onChange={(e) => {
            setUserData({ ...userData, nickname: e.target.value });
          }}
        />
        <input
          type="email"
          onChange={(e) => {
            setUserData({ ...userData, email: e.target.value });
          }}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            createUser();
          }}
        >
          Register
        </button>
      </form>
    </>
  );
};
export default Register;
