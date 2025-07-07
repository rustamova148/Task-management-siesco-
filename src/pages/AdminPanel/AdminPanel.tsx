import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/app/store";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./AdminPanel.module.css";
import UsersModalWrapper from "../../components/UsersModalWrapper/UsersModalWrapper";
import EditModalWrapper from "../../components/EditModalWrapper/EditModalWrapper";
import TaskModalWrapper from "../../components/TaskModalWrapper/TaskModalWrapper";
import TaskEditModalWrapper from "../../components/TaskEditModalWrapper/TaskEditModalWrapper";
import UserAssignModalWrapper from "../../components/UserAssignModalWrapper/UserAssignModalWrapper";
import AdminTable from "../../components/AdminTable/AdminTable";
import Planner from "../../components/Planner/Planner";

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
  const user = useSelector((state: RootState) => state.user.currentUser);

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
  const [activeUserTab, setActiveUserTab] = useState<"mytasks" | "planner">("mytasks");

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3001/users");
      const data = await res.json();
      const filteredData = data.filter((d: User) => d.role !== "admin");
      setUsers(filteredData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
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
  };
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
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} 
        activeUserTab={activeUserTab}
        setActiveUserTab={setActiveUserTab} />
        <div className={styles.tables_part_container}>
          {activeTab === "users" && user?.role === "admin" && (
            <div>
              <button className={styles.adduserbtn} onClick={showUserModal}>
                Add user
              </button>
              <div className={styles.admin_table_container}>
                <AdminTable
                  data={users}
                  rowKey={(user) => user.id}
                  columns={[
                    {
                      key: "orgname",
                      header: "Organization name",
                      renderCell: (u) => u.orgname,
                    },
                    {
                      key: "name",
                      header: "User name",
                      renderCell: (u) => u.name,
                    },
                    {
                      key: "email",
                      header: "User email",
                      renderCell: (u) => u.email,
                    },
                    {
                      key: "password",
                      header: "User password",
                      renderCell: (u) => u.password,
                    },
                    { key: "role", header: "Role", renderCell: (u) => u.role },
                    {
                      key: "actions",
                      header: "Actions",
                      renderCell: (u) => (
                        <div className={styles.actions_td}>
                          <button
                            className={styles.actions_btn}
                            onClick={() => toggleMenu(u.id)}
                          >
                            <i
                              className={`fa-solid fa-ellipsis ${styles.icon}`}
                            ></i>
                          </button>
                          {openMenuId === u.id && (
                            <ul className={styles.actions_options}>
                              <li>
                                <button
                                  className={styles.actions_option}
                                  onClick={() => showUserAssignModal(u.id)}
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
                                  onClick={() => showEditModal(u.id)}
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
                                  onClick={() => handleDeleteUser(u.id)}
                                >
                                  <i
                                    className={`fa-solid fa-trash ${styles.delete_icon}`}
                                  ></i>
                                  <span>Delete</span>
                                </button>
                              </li>
                            </ul>
                          )}
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          )}
          {activeTab === "tasks" && user?.role === "admin" && (
            <div>
              <button className={styles.adduserbtn} onClick={showTaskModal}>
                Add task
              </button>
              <div className={styles.admin_table_container}>
                <AdminTable
                  data={tasks}
                  rowKey={(task) => task.id}
                  columns={[
                    {
                      key: "taskname",
                      header: "Task name",
                      renderCell: (t) => t.taskname,
                    },
                    {
                      key: "taskdesc",
                      header: "Task Description",
                      renderCell: (t) => t.taskdesc,
                    },
                    {
                      key: "assignedto",
                      header: "Assigned to",
                      renderCell: (t) =>
                        users
                          .filter((u) => u.assignedTasks?.includes(t.id))
                          .map((u) => u.name)
                          .join(", "),
                    },
                    {
                      key: "deadline",
                      header: "Deadline",
                      renderCell: (t) => t.deadline,
                    },
                    {
                      key: "status",
                      header: "Status",
                      renderCell: (t) => t.status,
                    },
                    {
                      key: "actions",
                      header: "Actions",
                      renderCell: (t) => (
                        <div className={styles.actions_td}>
                          <button
                            className={styles.actions_btn}
                            onClick={() => toggleTaskMenu(t.id)}
                          >
                            <i
                              className={`fa-solid fa-ellipsis ${styles.icon}`}
                            ></i>
                          </button>
                          {openTaskMenuId === t.id && (
                            <ul className={styles.actions_options}>
                              <li>
                                <button
                                  className={styles.actions_option}
                                  onClick={() => showTaskEditModal(t.id)}
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
                                  onClick={() => handleDeleteTask(t.id)}
                                >
                                  <i
                                    className={`fa-solid fa-trash ${styles.delete_icon}`}
                                  ></i>
                                  <span>Delete</span>
                                </button>
                              </li>
                            </ul>
                          )}
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          )}
          {activeUserTab === "mytasks" && user?.role === "user" && (
              <div className={styles.admin_table_container}>
                <AdminTable
                  data={tasks.filter(task => user?.assignedTasks.includes(task.id))}
                  rowKey={(task) => task.id}
                  columns={[
                    {
                      key: "taskname",
                      header: "Task name",
                      renderCell: (t) => t.taskname,
                    },
                    {
                      key: "taskdesc",
                      header: "Task Description",
                      renderCell: (t) => t.taskdesc,
                    },
                    {
                      key: "deadline",
                      header: "Deadline",
                      renderCell: (t) => t.deadline,
                    },
                    {
                      key: "status",
                      header: "Status",
                      renderCell: (t) => t.status,
                    },
                  ]}
                />
              </div>
          )}
          {activeUserTab === "planner" && user?.role === "user" && (
              <div className={styles.admin_table_container}>
                <Planner tasks={tasks} />
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
          refreshUsers={fetchUsers}
        />
      )}
    </div>
  );
};

export default AdminPanel;
