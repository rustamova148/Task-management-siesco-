import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./AdminPanel.module.css";
import UsersModalWrapper from "../../components/UsersModalWrapper/UsersModalWrapper";
import EditModalWrapper from "../../components/EditModalWrapper/EditModalWrapper";
import TaskModalWrapper from "../../components/TaskModalWrapper/TaskModalWrapper";
import TaskEditModalWrapper from "../../components/TaskEditModalWrapper/TaskEditModalWrapper";
import UserAssignModalWrapper from "../../components/UserAssignModalWrapper/UserAssignModalWrapper";
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  orgname: string;
  orgnumber: number;
  orgaddress: string;
  orgId: number;
  assignedTasks: number[];
  role: string;
}

export interface Task {
  id: number;
  taskname: string;
  taskdesc: string;
  assignedto: string;
  deadline: string;
  status: string;
}

const AdminPanel = () => {
  const [userModal, setUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [userAssign, setUserAssign] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openMenuId, setOpenUserMenuId] = useState<number | null>(null);
  const [openTaskMenuId, setOpenTaskMenuId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [taskId, setTaskId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"users" | "tasks">("users");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3001/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:3001/tasks");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const showUserModal = () => {
    setUserModal(true);
  };
  const showTaskModal = () => {
    setTaskModal(true);
  };
  const showEditModal = (id: number) => {
    setEditUserModal(true);
    setUserId(id);
  };
  const showTaskEditModal = (id: number) => {
    setEditTaskModal(true);
    setTaskId(id);
  };
  const showUserAssignModal = (id: number) => {
    setUserAssign(true);
    setUserId(id);
  }
  const toggleMenu = (id: number) => {
    setOpenUserMenuId((prev) => (prev === id ? null : id));
  };
  const toggleTaskMenu = (id: number) => {
    setOpenTaskMenuId((prev) => (prev === id ? null : id));
  };
  const handleDeleteUser = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3001/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user.id !== id));
        setOpenUserMenuId(null);
      } else {
        alert("Error when deleting user");
      }
    } catch (error) {
      alert("No connection with server");
      console.error("Error deleting user:", error);
    }
  };
  const handleDeleteTask = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
        setOpenUserMenuId(null);
      } else {
        alert("Error when deleting task");
      }
    } catch (error) {
      alert("No connection with server");
      console.error("Error deleting task:", error);
    }
  };
  return (
    <div className={styles.admin_panel_container}>
      <div className={styles.general_container}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className={styles.tables_part_container}>
          {activeTab === "users" && (
            <div>
              <button className={styles.adduserbtn} onClick={showUserModal}>
                Add user
              </button>
              <div className={styles.admin_table_container}>
                <table className={styles.admin_table}>
                  <thead>
                    <tr>
                      <th>Organization name</th>
                      <th>User name</th>
                      <th>User email</th>
                      <th>User password</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.orgname}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.role}</td>
                        <td className={styles.actions_td}>
                          <button
                            className={styles.actions_btn}
                            onClick={() => toggleMenu(user.id)}
                          >
                            <i
                              className={`fa-solid fa-ellipsis ${styles.icon}`}
                            ></i>
                          </button>
                          {openMenuId === user.id && (
                            <ul className={styles.actions_options}>
                              <li>
                                <button
                                  className={styles.actions_option}
                                  onClick={() => showUserAssignModal(user.id)}
                                >
                                  <i
                                    className={`fa-solid fa-user-plus ${styles.assign_icon}`}
                                  ></i>
                                  <span>Assign</span>
                                </button>
                              </li>
                              <li>
                                <button
                                  className={styles.actions_option}
                                  onClick={() => showEditModal(user.id)}
                                >
                                  <i
                                    className={`fa-solid fa-pen ${styles.edit_icon}`}
                                  ></i>
                                  <span>Edit</span>
                                </button>
                              </li>
                              <li>
                                <button
                                  className={styles.actions_option}
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  <i
                                    className={`fa-solid fa-trash ${styles.delete_icon}`}
                                  ></i>
                                  <span>Delete</span>
                                </button>
                              </li>
                            </ul>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === "tasks" && (
            <div>
              <button className={styles.adduserbtn} onClick={showTaskModal}>
                Add task
              </button>
              <div className={styles.admin_table_container}>
                <table className={styles.admin_table}>
                  <thead>
                    <tr>
                      <th>Task name</th>
                      <th>Task Description</th>
                      <th>Assigned to</th>
                      <th>Deadline</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task.id}>
                        <td>{task.taskname}</td>
                        <td>{task.taskdesc}</td>
                        <td>{task.assignedto}</td>
                        <td>{task.deadline}</td>
                        <td>{task.status}</td>
                        <td className={styles.actions_td}>
                          <button
                            className={styles.actions_btn}
                            onClick={() => toggleTaskMenu(task.id)}
                          >
                            <i
                              className={`fa-solid fa-ellipsis ${styles.icon}`}
                            ></i>
                          </button>
                          {openTaskMenuId === task.id && (
                            <ul className={styles.actions_options}>
                              <li>
                                <button
                                  className={styles.actions_option}
                                  // onClick={() => showEditModal(user.id)}
                                >
                                  <i
                                    className={`fa-solid fa-user-plus ${styles.assign_icon}`}
                                  ></i>
                                  <span>Assign</span>
                                </button>
                              </li>
                              <li>
                                <button
                                  className={styles.actions_option}
                                  onClick={() => showTaskEditModal(task.id)}
                                >
                                  <i
                                    className={`fa-solid fa-pen ${styles.edit_icon}`}
                                  ></i>
                                  <span>Edit</span>
                                </button>
                              </li>
                              <li>
                                <button
                                  className={styles.actions_option}
                                  onClick={() => handleDeleteTask(task.id)}
                                >
                                  <i
                                    className={`fa-solid fa-trash ${styles.delete_icon}`}
                                  ></i>
                                  <span>Delete</span>
                                </button>
                              </li>
                            </ul>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      {userModal && (
        <UsersModalWrapper
          setUserModal={setUserModal}
          setUsers={setUsers}
          setOpenUserMenuId={setOpenUserMenuId}
        />
      )}
      {taskModal && (
        <TaskModalWrapper setTaskModal={setTaskModal} setTasks={setTasks} />
      )}
      {editUserModal && (
        <EditModalWrapper
          setEditUserModal={setEditUserModal}
          userId={userId}
          setUsers={setUsers}
          setOpenUserMenuId={setOpenUserMenuId}
        />
      )}
      {editTaskModal && (
        <TaskEditModalWrapper
          setEditTaskModal={setEditTaskModal}
          taskId={taskId}
          setTasks={setTasks}
          setOpenTaskMenuId={setOpenTaskMenuId}
        />
      )}
      {userAssign && (
        <UserAssignModalWrapper 
        setUserAssign={setUserAssign} 
        setOpenUserMenuId={setOpenUserMenuId}
        setTasks={setTasks}
        tasks={tasks}
        userId={userId}
        />
      )}
    </div>
  );
};

export default AdminPanel;
