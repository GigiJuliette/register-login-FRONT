import type { IApi } from "@svar-ui/react-gantt";
import { useEffect, useRef, useState } from "react";
import { linkServices } from "../services/linkServices";
import { taskService } from "../services/taskServices";

type UseGanttEventsProps = {
  api: IApi | undefined;
};

const useGanttEvents = ({ api }: UseGanttEventsProps) => {
  const isAddingFromServer = useRef<boolean>(false);
  const [status, setStatus] = useState<string>("");
  useEffect(() => {
    if (!api) return;

    api.on("update-task", async ({ task }) => {
      await taskService.updateTask(task);
    });

    api.intercept("add-task", async (ev) => {
      if (isAddingFromServer.current) {
        isAddingFromServer.current = false;
        return;
      }
      const createFunc = async () => {
        try {
          const created = await taskService.createTask(ev.task);
          isAddingFromServer.current = true;
          api.exec("add-task", {
            id: created._id,
            task: created,
          });
        } catch (_err) {
          setStatus("Failed to create task");
        }
      };
      createFunc();
      return false;
    });
    // api.on("add-task", async (task) => {
    //   await taskService.createTask(task);
    // });
    api.on("delete-task", async ({ id }) => {
      await taskService.deleteTask(id);
    });

    api.on("add-link", async ({ link }) => {
      await linkServices.createLink(link);
    });

    api.on("update-link", async ({ link }) => {
      await linkServices.updateLink(link);
    });

    api.on("delete-link", async ({ id }) => {
      await linkServices.deleteLink(id);
    });
  }, [api]);
  return { status };
};

export default useGanttEvents;
