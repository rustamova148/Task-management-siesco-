import styles from "./Planner.module.css";
import type { Task } from "../../pages/AdminPanel/AdminPanel";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/app/store";
import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";

const statuses = ["To do", "In progress", "Review", "Completed", "Deferred"];

interface PlannerProps {
  tasks: Task[];
  refreshTasks: () => void;
}

const Planner: React.FC<PlannerProps> = ({ tasks, refreshTasks }) => {

  const user = useSelector((state: RootState) => state.user.currentUser);

  // Local state — ilk dəyər prop-dan gəlir
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks);

  // Əgər prop dəyişirsə, localTasks-i yenilə
  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  // Drag bitdikdə çağırılır
  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    const taskId = draggableId;
    const newStatus = destination.droppableId;

    setLocalTasks(prev =>
      prev.map(task =>
        String(task.id) === draggableId
          ? { ...task,  status: newStatus}
          : task
      )
    );
    // Burada backend update əməliyyatı
    try {
    const res = await fetch(`http://task-management-siesco-13-backend.onrender.com/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });
    refreshTasks();
    if (!res.ok) {
      throw new Error("Status update failed");
    }
    } catch (error) {
    console.error("Failed to update status in backend:", error);
    }
   };

  return (
    <div className={styles.planner}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.planner_parts}>
          {statuses.map(status => (
            <div key={status} className={styles.planner_part}>
              <div
                className={
                  styles[`status_${status.toLowerCase().replace(" ", "")}_head`]
                }
              >
                {status}{" "}
                <span className={styles.status_count}>
                  (
                  {
                    localTasks.filter(
                      task =>
                        user?.assignedTasks?.includes(task.id) &&
                        task.status === status
                    ).length
                  }
                  )
                </span>
              </div>

              <Droppable
                droppableId={status}
                isDropDisabled={false}
                isCombineEnabled={false}
                ignoreContainerClipping={false}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={styles.status_body}
                  >
                    {localTasks
                      .filter(
                        task =>
                          user?.assignedTasks?.includes(task.id) &&
                          task.status === status
                      )
                      .map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={String(task.id)}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={styles.task_card}
                            >
                              <p className={styles.task_title}>{task.taskname}</p>
                              <p className={styles.task_deadline}>
                                Deadline: {task.deadline}
                              </p>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Planner;
