import "./EditProfile.css";

import { userService } from "../../services/api";
import EditProfileIcon from "../EditProfileIcon/EditProfileIcon";
import { useState, useContext } from "react";
import { UserContext } from "../../context/userProvider";

const EditProfile = () => {
  const { user, setUser, loading } = useContext(UserContext);
  const [formStatus, setFormStatus] = useState<string>(
    "Click on values to update them."
  );

  const updateUserData = async () => {
    try {
      await userService.updateProfile(user);
      setFormStatus("Update successfull!");
    } catch (error: any) {
      setFormStatus(error.message);
    }
  };
  if (!user || loading) {
    return <p>Loading ...</p>;
  }
  return (
    <>
      <form className="updateProfile-form">
        <h1>My profile</h1>
        <EditProfileIcon setUserData={setUser} userData={user} />
        <div data-text="Nickname" className="updateProfile-nickname">
          <input
            type="text"
            value={user.nickname}
            onChange={(e) => {
              setUser({ ...user, nickname: e.target.value });
            }}
          />
        </div>
        <div data-text="Name" className="updateProfile-name">
          <input
            type="text"
            value={user.name}
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
          />
        </div>
        <div data-text="Surname" className="updateProfile-surname">
          <input
            type="text"
            value={user.surname}
            onChange={(e) => {
              setUser({ ...user, surname: e.target.value });
            }}
          />
        </div>
        <div data-text="Bio" className="updateProfile-bio">
          <input
            value={user.bio}
            onChange={(e) => {
              setUser({ ...user, bio: e.target.value });
            }}
          />
        </div>
        <div data-text="Email" className="updateProfile-email">
          <input
            type="email"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
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
