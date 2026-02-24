import {
  Gantt,
  Willow,
  Editor,
  type IApi,
  type ITask,
} from "@svar-ui/react-gantt";
import "@svar-ui/react-gantt/all.css";
import { useState, useEffect } from "react";
import { taskService } from "../../services/taskServices";
import { useFetch } from "../../hooks/useFetch";

const Planner = () => {
  const [api, setApi] = useState<IApi | undefined>(undefined);

  const { data, loading } = useFetch<ITask[]>(taskService.getAll);

  useEffect(() => {
    if (!api) return;
    api.on("update-task", async ({ task }) => {
      await taskService.updateTask(task);
    });
    api.on("add-task", async ({ task }) => {
      await taskService.createTask(task);
    });
  }, [api]);

  if (loading) return <p>Loading..</p>;
  return (
    <Willow>
      <Gantt tasks={data} ref={setApi} />
      {api && <Editor api={api} />}
    </Willow>
  );
};
export default Planner;
