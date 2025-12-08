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

  return (
    <>
      <h2>Users List</h2>
      <ul className="usersList-container">
        {users.map((u: UserInfos) => {
          return (
            <li className="userList-items glass" key={u.email}>
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
