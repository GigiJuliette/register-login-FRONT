const API_URL = "http://localhost:2711/";

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    const error: any = new Error(errorData.message);
    error.status = response.status;
    throw error;
  }
  return response.json();
};

export const userService = {
  register: async (userData: {
    nickname: string;
    email: string;
    password: string;
  }) => {
    const response = await fetch(`${API_URL}register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  getToken: async (userData: {
    nickname: string;
    email: string;
    password: string;
  }) => {
    const response = await fetch(`${API_URL}logIn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  getAllUsers: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await fetch(`${API_URL}users`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  getMyUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await fetch(`${API_URL}myUser`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  updateProfile: async (updateData: {
    nickname?: string;
    name?: string;
    surname?: string;
    bio?: string;
    email?: string;
    profileIcon_id?: number;
  }) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    return handleResponse(response);
  },
};
