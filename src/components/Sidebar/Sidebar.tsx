import { useDispatch, useSelector } from "react-redux";
import styles from "./Sidebar.module.css";
import type { RootState } from "../../redux/app/store";
import { clearUser } from "../../redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";

interface TabsProps {
  activeTab: "users" | "tasks";
  setActiveTab: React.Dispatch<React.SetStateAction<"users" | "tasks">>;
  activeUserTab: "mytasks" | "planner";
  setActiveUserTab: React.Dispatch<React.SetStateAction<"mytasks" | "planner">>;
}

const Sidebar = ({ activeTab, setActiveTab, activeUserTab, setActiveUserTab }: TabsProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.currentUser);

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("user");
    navigate("/signin");
  };
  return (
    <div className={styles.sidebar_container}>
      <p className={styles.sidebar_head}>Task Manager</p>
      <div className={styles.tabWrapper}>
        {user?.role === "admin" ? (
          <div className={styles.tabContainer}>
            <button
              className={`${styles.tabBtn} ${
                activeTab === "users" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("users")}
            >
              <i className="fa-solid fa-users"></i>
              <span>Users</span>
            </button>
            <button
              className={`${styles.tabBtn} ${
                activeTab === "tasks" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("tasks")}
            >
              <i className="fa-solid fa-list-check"></i>
              <span>Tasks</span>
            </button>
          </div>
        ) : (
          <div>
            <button
              className={`${styles.tabBtn} ${
                activeUserTab === "mytasks" ? styles.active : ""
              }`}
              onClick={() => setActiveUserTab("mytasks")}
            >
              <i className="fa-solid fa-list-check"></i>
              <span>My Tasks</span>
            </button>
            <button
              className={`${styles.tabBtn} ${
                activeUserTab === "planner" ? styles.active : ""
              }`}
              onClick={() => setActiveUserTab("planner")}
            >
              <i className="fa-solid fa-clipboard-list"></i>
              <span>Planner</span>
            </button>
          </div>
        )}
      </div>

      <div className={styles.profilebox}>
        <div className={styles.profile_info}>
          <span>{user?.name}</span>
          <span>({user?.role})</span>
        </div>
        <button className={styles.logout_btn} onClick={handleLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
