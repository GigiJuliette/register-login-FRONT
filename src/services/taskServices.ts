import type { ITask } from "@svar-ui/react-gantt";
import authFetch from "./utils/authFetch";
import { handleResponse } from "./utils/handleResponse";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const taskService = {
  createTask: async (task: Partial<ITask>) => {
    const now = new Date();
    const defaultEnd = new Date(now);
    defaultEnd.setDate(defaultEnd.getDate() + 1);

    const payload = {
      ...task,
      parent: undefined,
      text: "NOUVELLE TACHE",
      start: now,
      end: defaultEnd,
      duration: 1,
      progress: 0,
      type: "task",
    };
    const response = await authFetch(`${VITE_API_URL}api/task`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return handleResponse(response);
  },
  updateTask: async (task: ITask) => {
    const payload = {
      ...task,
      parent: task.parent === 0 ? undefined : task.parent,
    };
    const response = await authFetch(`${VITE_API_URL}api/task`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },
  deleteTask: async (id: number | string) => {
    const response = await authFetch(`${VITE_API_URL}api/task/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },
  getAll: async () => {
    const response = await authFetch(`${VITE_API_URL}api/task`, {
      method: "GET",
    });
    const tasks: ITask[] = await handleResponse(response);
    return tasks.map((task) => ({
      ...task,
      id: task._id,
    }));
  },
};
