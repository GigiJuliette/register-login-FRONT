import { userService } from "../../services/api";
import "./EditProfile.css";
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
  const [formStatus, setFormStatus] = useState(
    "Click on values to update them."
  );
  const [seePassword, setSeePassword] = useState(false);
  const [uncorrect, setUncorrect] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>();

  // const [updateData, setUpdateData] = useState<UserData>({
  //   password: "",
  // });

  useEffect(() => {
    const fetchMyUser = async () => {
      try {
        setLoading(true);
        console.log("hi");
        const myUser = await userService.getMyUser();
        console.log("bye");
        setUserData({
          name: myUser.name || "",
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
  if (loading) {
    return <p>Loading ...</p>;
  }
  return (
    <>
      <form className="updateProfile-form">
        <h1>My profile</h1>
        <div data-text="Nickname">
          <input
            type="text"
            value={userData.nickname}
            onChange={(e) => {
              setUserData({ ...userData, nickname: e.target.value });
            }}
          />
        </div>
        <div data-text="Name">
          <input
            type="text"
            value={userData.name}
            onChange={(e) => {
              setUserData({ ...userData, name: e.target.value });
            }}
          />
        </div>
        <div data-text="Surname">
          <input
            type="text"
            value={userData.surname}
            onChange={(e) => {
              setUserData({ ...userData, surname: e.target.value });
            }}
          />
        </div>
        <div data-text="Bio">
          <input
            type="text"
            value={userData.bio}
            onChange={(e) => {
              setUserData({ ...userData, bio: e.target.value });
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
        {/* <div data-text="Password">
          <input
            type={seePassword ? "text" : "password"}
            // value={updateData.password}
            className={uncorrect ? "uncorrectPassword" : ""}
            onChange={(e) => {
              setUncorrect(false);
              // setUpdateData({ ...updateData, password: e.target.value });
            }}
          />
        </div> */}
        {/* <button
          type="button"
          className="toggleHide"
          onClick={() => {
            setSeePassword((prev) => !prev);
          }}
        >
          <em>{seePassword ? "hide passwords" : "show passwords"}</em>
        </button> */}
        <em className="authStatus">{formStatus}</em>
        <button
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
