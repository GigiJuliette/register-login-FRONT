import "./UsersList.css";

import icon0 from "../../assets/profile/iconProfile0.jpg";
import icon1 from "../../assets/profile/iconProfile1.jpg";
import icon2 from "../../assets/profile/iconProfile2.jpg";
import icon3 from "../../assets/profile/iconProfile3.jpg";
import icon4 from "../../assets/profile/iconProfile4.jpg";
import icon5 from "../../assets/profile/iconProfile5.jpg";

import { userService } from "../../services/userServices";
import { useFetch } from "../../hooks/useFetch";
import type { User } from "../../types/User";

const UsersList = () => {
  const { data, loading } = useFetch<User[]>(userService.getAllUsers);

  if (loading || !data) {
    return <p>Loading...</p>;
  }
  const icons = [icon0, icon1, icon2, icon3, icon4, icon5];

  return (
    <>
      <h1>Users List</h1>
      <ul className="usersList-container">
        {data.map((u: User) => {
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
