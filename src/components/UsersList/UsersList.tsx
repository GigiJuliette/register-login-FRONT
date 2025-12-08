import "./UsersList.css";

import icon0 from "../../assets/profile/iconProfile0.jpg";
import icon1 from "../../assets/profile/iconProfile1.jpg";
import icon2 from "../../assets/profile/iconProfile2.jpg";
import icon3 from "../../assets/profile/iconProfile3.jpg";
import icon4 from "../../assets/profile/iconProfile4.jpg";
import icon5 from "../../assets/profile/iconProfile5.jpg";

import { useEffect, useState } from "react";
import { userService } from "../../services/api";
import { useNavigate } from "react-router";

interface UserInfos {
  name?: string;
  surname?: string;
  nickname?: string;
  bio?: string;
  email?: string;
  profileIcon_id?: number;
}
const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const allUsers = await userService.getAllUsers();
        setUsers(allUsers);
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
    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  const icons = [icon0, icon1, icon2, icon3, icon4, icon5];

  return (
    <>
      <h2>Users List</h2>
      <ul className="usersList-container">
        {users.map((u: UserInfos) => {
          const currentIcon = u.profileIcon_id ?? 0;
          return (
            <li className="userList-items glass" key={u.email}>
              <img src={icons[currentIcon]} alt="User's icon" />
              <h4>{u.nickname}</h4>
              <em>{u.bio}</em>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default UsersList;
