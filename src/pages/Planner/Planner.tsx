import "@svar-ui/react-gantt/all.css";
import {
  Editor,
  Gantt,
  type IApi,
  type ILink,
  type ITask,
  Willow,
} from "@svar-ui/react-gantt";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { linkServices } from "../../services/linkServices";
import { taskService } from "../../services/taskServices";
import useGanttEvents from "../../hooks/useGanttEvents";

const Planner = () => {
  const [api, setApi] = useState<IApi | undefined>(undefined);
  const { data: tasks, loading: tasksLoading } = useFetch<ITask[]>(
    taskService.getAll,
  );
  const { data: links, loading: linksLoading } = useFetch<ILink[]>(
    linkServices.getAll,
  );
  const { status } = useGanttEvents({ api });

  if (tasksLoading || linksLoading) return <p>Loading..</p>;
  return (
    <div className="gantt_container">
      <Willow>
        <Gantt
          tasks={tasks}
          links={links}
          ref={setApi}
          start={new Date()}
          end={new Date("2026-06-30")}
        />
        {api && <Editor api={api} />}
      </Willow>
      <p>{status}</p>
    </div>
  );
};
export default Planner;
