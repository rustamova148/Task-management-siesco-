import Modal from "../Modal/Modal";
import type { Task } from "../../pages/AdminPanel/AdminPanel";
import styles from "./TaskEditModalWrapper.module.css";
import { useState, useEffect } from "react";

const TaskEditModalWrapper = ({
  setEditTaskModal,
  taskId,
  setTasks,
  setOpenTaskMenuId
}: {
  setEditTaskModal: (value: boolean) => void;
  taskId: number | null;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setOpenTaskMenuId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {

  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [formData, setFormData] = useState({
    taskname: "",
    taskdesc: "",
    assignedto: "",
    deadline: "",
    status: "",
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        taskname: taskToEdit.taskname,
        taskdesc: taskToEdit.taskdesc,
        assignedto: taskToEdit.assignedto,
        deadline: taskToEdit.deadline,
        status: taskToEdit.status,
      });
    }
  }, [taskToEdit]);

  useEffect(() => {
    const fetchUserById = async (id: number) => {
      try {
        const res = await fetch(`https://task-management-siesco-13-backend.onrender.com/tasks/${id}`);
        if (!res.ok) throw new Error("Task not found");
        const user = await res.json();
        setTaskToEdit(user);
      } catch (error) {
        console.error("Error fetching task:", error);
        setTaskToEdit(null);
      }
    };

    if (taskId !== null) {
      fetchUserById(taskId);
    }
  }, [taskId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskId === null) return;
    
    try {
      const res = await fetch(`https://task-management-siesco-13-backend.onrender.com/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskname: formData.taskname,
          taskdesc: formData.taskdesc,
          deadline: formData.deadline,
          status: formData.status,
        }),
      });
      const updatedTask = await res.json();
      if (res.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
        );
        setEditTaskModal(false);
        setOpenTaskMenuId(null);
      } else {
        alert("Error updating task");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Connection error");
    }
  };

  return (
    <Modal setEditTaskModal={setEditTaskModal} setOpenTaskMenuId={setOpenTaskMenuId}>
      <form className={styles.edit_form} onSubmit={handleEditUser}>
        <label htmlFor="edtaskname">Task name:</label>
        <input
          type="text"
          name="taskname"
          id="edtaskname"
          value={formData.taskname}
          className={styles.edit_input}
          onChange={handleChange}
        />

        <label htmlFor="edtaskdesc">Task Description:</label>
        <input
          type="text"
          name="taskdesc"
          id="edtaskdesc"
          value={formData.taskdesc}
          className={styles.edit_input}
          onChange={handleChange}
        />

        <label htmlFor="eddeadline">Deadline:</label>
        <input
          type="date"
          name="deadline"
          id="eddeadline"
          value={formData.deadline}
          className={styles.edit_input}
          onChange={handleChange}
        />

        <button type="submit" className={styles.edit_task_submit}>
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default TaskEditModalWrapper;
