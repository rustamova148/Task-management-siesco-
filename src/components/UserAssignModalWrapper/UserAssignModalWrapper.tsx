import Modal from "../Modal/Modal";
import { useState, useEffect } from "react";
import type { MultiValue } from "react-select";
import styles from "./UserAssignModalWrapper.module.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import type { Task } from "../../pages/AdminPanel/AdminPanel";

const animatedComponents = makeAnimated();

type Option = {
  value: number;
  label: string;
};

const UserAssignModalWrapper = ({
  setUserAssign,
  setOpenUserMenuId,
  setTasks,
  tasks,
  userId,
  refreshUsers
}: {
  setUserAssign: (value: boolean) => void;
  setOpenUserMenuId: React.Dispatch<React.SetStateAction<number | null>>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  tasks: Task[];
  userId: number | null;
  refreshUsers: () => void;
}) => {

const [selectedTasksIds, setSelectedTasksIds] = useState<number[]>([]);
const [alreadyAssignedIds, setAlreadyAssignedIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
    try {
      const tasksRes = await fetch("http://localhost:3001/tasks");
      const tasksData = await tasksRes.json();
      setTasks(tasksData);

      if (userId !== null) {
        const userRes = await fetch(`http://localhost:3001/users/${userId}`);
        const userData = await userRes.json();
        setAlreadyAssignedIds(userData.assignedTasks || []);
      }
    } catch (err) {
      console.log("Error fetching data");
    }
  };

  fetchData();

  }, [userId]);

  const options: Option[] = tasks
  .map((task) => ({
    value: task.id,
    label: task.taskname,
  }));
 

  const handleAssignTasks = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
 
  if(userId === null) return;

  try{
  const res = await fetch(`http://localhost:3001/users/${userId}`);
  const data = await res.json();
  data.assignedTasks = [...data.assignedTasks, ...selectedTasksIds];
  setAlreadyAssignedIds(data.assignedTasks);

  await fetch(`http://localhost:3001/users/${userId}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
  });
  }catch(err){
   console.error("Error");
  }
  setUserAssign(false);
  setOpenUserMenuId(null);
  refreshUsers();
  }

  return (
    <Modal setUserAssign={setUserAssign} setOpenUserMenuId={setOpenUserMenuId}>
      <form onSubmit={handleAssignTasks}>
        <Select<Option, true>
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={options.filter((opt: Option) => !alreadyAssignedIds.includes(opt.value))}
          onChange={(selected: MultiValue<Option>) => {
          const selectedIds = selected ? selected.map((opt: Option) => opt.value) : [];
          console.log("Seçilmişlər:", selectedIds);
          setSelectedTasksIds(selectedIds);
        }}
          styles={{
            control: (base) => ({
              ...base,
              width: "380px",
              backgroundColor: "#f0f0f0",
              borderColor: "#999",
              borderRadius: "10px",
              minHeight: "45px",
              boxShadow: "none",
              "&:hover": {
                borderColor: "#333",
              },
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected
                ? "#007bff"
                : state.isFocused
                ? "#e6f0ff"
                : "#fff",
              color: state.isDisabled ? "#999" : state.isSelected ? "#fff" : "#333",
              cursor: state.isDisabled ? "not-allowed" : "pointer",
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: "#007bff",
              color: "#fff",
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: "#fff",
            }),
            multiValueRemove: (base) => ({
              ...base,
              color: "#fff",
              ":hover": {
                backgroundColor: "#0056b3",
                color: "#fff",
              },
            }),
          }}
        />
        <button type="submit" className={styles.submit}>Submit</button>
      </form>
    </Modal>
  );
};

export default UserAssignModalWrapper;
