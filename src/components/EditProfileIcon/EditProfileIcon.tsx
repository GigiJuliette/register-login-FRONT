import "./EditProfileIcon.css";
import edit from "../../assets/icon/edit.svg";
import icon0 from "../../assets/profile/iconProfile0.jpg";
import icon1 from "../../assets/profile/iconProfile1.jpg";
import icon2 from "../../assets/profile/iconProfile2.jpg";
import icon3 from "../../assets/profile/iconProfile3.jpg";
import icon4 from "../../assets/profile/iconProfile4.jpg";
import icon5 from "../../assets/profile/iconProfile5.jpg";
import { useState } from "react";
import IconProfile from "../IconProfile/IconProfile";

interface EditProfileIconProps {
  userData: {
    name?: string;
    surname?: string;
    nickname?: string;
    bio?: string;
    email?: string;
    profileIcon_id?: number;
  };
  setUserData: React.Dispatch<React.SetStateAction<any>>;
}

const editProfileIcon = ({ userData, setUserData }: EditProfileIconProps) => {
  const [isClosed, setIsClosed] = useState<boolean>(true);
  const icons = [icon0, icon1, icon2, icon3, icon4, icon5];
  const currentIcon = userData.profileIcon_id ?? 0;

  return (
    <div className="iconPicker-container">
      <IconProfile iconIndex={currentIcon} className="profileIcon-Prim" />
      <div
        className=" editIcon glass"
        onClick={() => {
          setIsClosed((prev) => !prev);
        }}
      >
        <img src={edit} />
      </div>
      <div
        className={
          isClosed ? "iconPicker glass isClosed" : "iconPicker glass isOpen"
        }
      >
        {icons.map((icon, index) => (
          <img
            key={index}
            src={icon}
            className="profileIcon-sec"
            onClick={() => {
              setUserData({ ...userData, profileIcon_id: index });
              setIsClosed((prev) => !prev);
            }}
            alt={`Profile icon ${index}`}
          />
        ))}
      </div>
    </div>
  );
};
export default editProfileIcon;
