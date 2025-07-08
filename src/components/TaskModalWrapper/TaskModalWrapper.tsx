import { useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./TaskModalWrapper.module.css";
import type {Task} from "../../pages/AdminPanel/AdminPanel";

const TaskModalWrapper = ({setTaskModal,setTasks}:{ setTaskModal: (value: boolean) => void;
setTasks: React.Dispatch<React.SetStateAction<Task[]>>})=> {

type FormDataType = {
    taskname: string;
    taskdesc: string;
    // assignedto: string;
    deadline: string;
    status: string;
}
const [formData, setFormData] = useState<FormDataType>({
    taskname: "",
    taskdesc: "",
    deadline: "",
    status: "",
})

const [errors, setErrors] = useState<{ [key: string]: string }>({});

const validate = () => {
  const newErrors: { [key: string]: string } = {};

  if (!formData.taskname.trim()) {
    newErrors.taskname = "Task name is required";
  }
  if (!formData.taskdesc.trim()) {
    newErrors.taskdesc= "Description is required";
  }
  if (!formData.deadline.trim()) {
    newErrors.deadline = "Deadline is required";
  }
  if (!formData.status.trim()) {
    newErrors.status = "Status is required";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
}))
}

const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
    return;
    }
    try{
        const res = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            taskname: formData.taskname,
            taskdesc: formData.taskdesc,
            deadline: formData.deadline,
            status: formData.status,
        })
    })

    if(res.ok){
      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
      setTaskModal(false);
    }else{
        alert("Error when adding user");
        setTaskModal(false);
    }
    }catch(error){
      alert("No connection with server");
    }
}
  return (
    <Modal setTaskModal={setTaskModal}>
      <form className={styles.tasks_form} onSubmit={handleAddTask}>

        <label htmlFor="taskname">Task Name:</label>
        <input
          type="text"
          name="taskname"
          id="taskname"
          className={`${styles.tasks_input} ${errors.taskname ? styles.error : ""}`}
          value={formData.taskname}
          onChange={handleChange}
        />
        {errors.taskname && <span style={{ color: "red", fontSize: "11px", marginTop: "-10px" }}>{errors.taskname}</span>}

        <label htmlFor="taskdesc">Description:</label>
        <input
          type="text"
          name="taskdesc"
          id="taskdesc"
          className={`${styles.tasks_input} ${errors.taskdesc ? styles.error : ""}`}
          value={formData.taskdesc}
          onChange={handleChange}
        />
        {errors.taskdesc && <span style={{ color: "red", fontSize: "11px", marginTop: "-10px" }}>{errors.taskdesc}</span>}
        
        <label htmlFor="deadline">Deadline:</label>
        <input
          type="date"
          name="deadline"
          id="deadline"
          className={`${styles.tasks_input} ${errors.deadline ? styles.error : ""}`}
          value={formData.deadline}
          onChange={handleChange}
        />
        {errors.deadline && <span style={{ color: "red", fontSize: "11px", marginTop: "-10px" }}>{errors.deadline}</span>}

        <label htmlFor="status">Status:</label>
        <select
          name="status"
          id="status"
          className={`${styles.tasks_input} ${errors.status ? styles.error : ""}`}
          value={formData.status}
          onChange={handleChange}
        >
          <option value="">-- Select status --</option>
          <option value="To do">To do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        {errors.status && <span style={{ color: "red", fontSize: "11px", marginTop: "-10px" }}>{errors.status}</span>}

        <button type="submit" className={styles.add_task_submit}>Submit</button>
      </form>
    </Modal>
  );
};

export default TaskModalWrapper;