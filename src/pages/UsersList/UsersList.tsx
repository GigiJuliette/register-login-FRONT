import Background from "../../components/Background/Background";
import "./UsersList.css";
import { useEffect, useState } from "react";
import { userService } from "../../services/api";
import { useNavigate } from "react-router";

interface UserInfos {
  nickname: string;
  email: string;
}
const UsersList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await userService.getAllUsers();
        setUsers(allUsers);
      } catch (error: any) {
        if (error.status === 401) {
          navigate("/authentication");
        }
      }
    };
    fetchUsers();
  }, []);

  if (users.length === 0) {
    return <p>Loading</p>;
  }
  return (
    <>
      <Background />
      <ul className="usersList-container">
        {users.map((u: UserInfos) => {
          return (
            <li className="userList-items" key={u.email}>
              <span>{u.nickname}</span>
              <em>{u.email}</em>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default UsersList;
