import "./EditProfile.css";

import { userService } from "../../services/api";
import EditProfileIcon from "../ProfileIcon/EditProfileIcon";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

interface UserData {
  name?: string;
  surname?: string;
  nickname?: string;
  bio?: string;
  email?: string;
  profileIcon_id?: number;
}

const EditProfile = () => {
  const [formStatus, setFormStatus] = useState<string>(
    "Click on values to update them."
  );
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({});

  useEffect(() => {
    const fetchMyUser = async () => {
      try {
        setLoading(true);
        console.log("hi");
        const myUser = await userService.getMyUser();
        console.log("bye");
        setUserData({
          name: myUser.name,
          surname: myUser.surname,
          nickname: myUser.nickname,
          bio: myUser.bio,
          email: myUser.email,
          profileIcon_id: myUser.profileIcon_id,
        });
      } catch (error: any) {
        if (
          error.status === 401 ||
          error.status === 403 ||
          error.message === "No token found"
        ) {
          navigate("/authentication");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMyUser();
  }, []);

  const updateUserData = async () => {
    try {
      console.log(userData);
      await userService.updateProfile(userData);
      setFormStatus("Update successfull!");
    } catch (error: any) {
      setFormStatus(error.message);
    } finally {
      setLoading(false);
    }
  };
  if (loading || !userData) {
    return <p>Loading ...</p>;
  }
  return (
    <>
      <form className="updateProfile-form">
        <h1>My profile</h1>
        <EditProfileIcon setUserData={setUserData} userData={userData} />
        <div data-text="Nickname" className="updateProfile-nickname">
          <input
            type="text"
            value={userData.nickname}
            onChange={(e) => {
              setUserData({ ...userData, nickname: e.target.value });
            }}
          />
        </div>
        <div data-text="Name" className="updateProfile-name">
          <input
            type="text"
            value={userData.name}
            onChange={(e) => {
              setUserData({ ...userData, name: e.target.value });
            }}
          />
        </div>
        <div data-text="Surname" className="updateProfile-surname">
          <input
            type="text"
            value={userData.surname}
            onChange={(e) => {
              setUserData({ ...userData, surname: e.target.value });
            }}
          />
        </div>
        <div data-text="Bio" className="updateProfile-bio">
          <input
            value={userData.bio}
            onChange={(e) => {
              setUserData({ ...userData, bio: e.target.value });
            }}
          />
        </div>
        <div data-text="Email" className="updateProfile-email">
          <input
            type="email"
            value={userData.email}
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
          />
        </div>
        <em className="authStatus">{formStatus}</em>
        <button
          className="glass"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            updateUserData();
          }}
        >
          Save changes
        </button>
      </form>
    </>
  );
};
export default EditProfile;
