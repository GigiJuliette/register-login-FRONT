const API_URL = "http://localhost:2711/";

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
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
};
