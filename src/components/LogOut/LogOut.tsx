import "./LogOut.css";
import { useState } from "react";
import { useNavigate } from "react-router";
interface LogOutProps {
  setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
}
const LogOut = ({ setCurrentSection }: LogOutProps) => {
  const navigate = useNavigate();
  const [disapear, setDisapear] = useState(false);
  return (
    <>
      <div className={disapear ? "isDisapearing logout" : "logout"}>
        <h3>Are you sure you want to log out? </h3>
        <button
          type="button"
          className="glass"
          onClick={() => {
            setDisapear(true);
            setTimeout(() => {
              setCurrentSection("");
            }, 1000);
          }}
        >
          <strong>No</strong>, I regret.
        </button>
        <button
          type="button"
          className="glass"
          onClick={() => {
            localStorage.token = "";
            setDisapear(true);
            setTimeout(() => {
              navigate("/authentication");
            }, 1000);
          }}
        >
          <strong>Yes</strong>, quit now.
        </button>
      </div>
    </>
  );
};
export default LogOut;
