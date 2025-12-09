import { createContext, useState, useEffect } from "react";
import { userService } from "../services/api";
import { useNavigate } from "react-router";

interface UserData {
  name?: string;
  surname?: string;
  nickname?: string;
  bio?: string;
  email?: string;
  profileIcon_id?: number;
}

interface UserContextType {
  loading: boolean;
  user: UserData;
  setUser: React.Dispatch<React.SetStateAction<UserData>>;
  refreshUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  loading: false,
  user: {},
  setUser: () => {},
  refreshUser: async () => {},
});

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserData>({});
  const navigate = useNavigate();

  const fetchMyUser = async () => {
    try {
      setLoading(true);
      const myUser = await userService.getMyUser();
      console.log("i fetch");
      setUser({
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

  useEffect(() => {
    fetchMyUser();
  }, []);

  const value = {
    loading,
    user,
    setUser,
    refreshUser: fetchMyUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
