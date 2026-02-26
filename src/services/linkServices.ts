import type { ILink } from "@svar-ui/react-gantt";
import authFetch from "./utils/authFetch";
import { handleResponse } from "./utils/handleResponse";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const linkServices = {
  createLink: async (link: Partial<ILink>) => {
    const response = await authFetch(`${VITE_API_URL}api/link`, {
      method: "POST",
      body: JSON.stringify(link),
    });
    return handleResponse(response);
  },
  updateLink: async (link: Partial<ILink>) => {
    const response = await authFetch(`${VITE_API_URL}api/link/${link.id}`, {
      method: "PUT",
      body: JSON.stringify(link),
    });
    return handleResponse(response);
  },
  deleteLink: async (id: string | number) => {
    const response = await authFetch(`${VITE_API_URL}api/link/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },
  getAll: async () => {
    const response = await authFetch(`${VITE_API_URL}api/link`, {
      method: "GET",
    });
    const links: ILink[] = await handleResponse(response);
    return links.map((link) => ({
      ...link,
      id: link._id,
    }));
  },
};
