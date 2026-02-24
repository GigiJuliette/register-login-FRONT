import type { User } from "../types/User";

import authFetch from "./utils/authFetch";
import { handleResponse } from "./utils/handleResponse";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const userService = {
  getAllUsers: async () => {
    const response = await authFetch(`${VITE_API_URL}api/user/allUsers`, {
      method: "GET",
    });
    return handleResponse(response);
  },

  getMyUser: async () => {
    const response = await authFetch(`${VITE_API_URL}api/user/myUser`, {
      method: "GET",
    });
    return handleResponse(response);
  },

  updateProfile: async (updateData: User) => {
    const response = await authFetch(`${VITE_API_URL}api/user/update`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    });
    return handleResponse(response);
  },
};
