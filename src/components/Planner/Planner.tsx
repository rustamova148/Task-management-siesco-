import styles from "./Planner.module.css";
import type { Task } from "../../pages/AdminPanel/AdminPanel";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/app/store";

const Planner = ({tasks}:{tasks: Task[]}) => {
const user = useSelector((state:RootState) => state.user.currentUser);
    return(
        <div className={styles.planner}>
            <div className={styles.planner_parts}>
                <div className={styles.planner_part}>
                    <div className={styles.status_todo_head}>
                      To do <span className={styles.status_count}>(0)</span>
                    </div>
                    <div className={styles.status_body}>
                    {tasks.filter(task => user?.assignedTasks?.includes(task.id))
                    .filter(t => t.status === "To do")
                    .map(t => (
                    <div className={styles.task_card}>
                    <p className={styles.task_title}>{t.taskname}</p>
                    <p className={styles.task_deadline}>Deadline: {t.deadline}</p>
                    </div>
                    ))}
                    </div>
                </div>
                <div>
                    <div className={styles.status_inprog_head}>
                    In progress <span className={styles.status_count}>(0)</span>
                    </div>
                    <div className={styles.status_body}>
                        body
                    </div>
                </div>
                <div>
                    <div className={styles.status_review_head}>
                    Review <span className={styles.status_count}>(0)</span>
                    </div>
                    <div className={styles.status_body}>
                        body
                    </div>
                </div>
                <div>
                    <div className={styles.status_comp_head}>
                    Completed <span className={styles.status_count}>(0)</span>
                    </div>
                    <div className={styles.status_body}>
                        body
                    </div>
                </div>
                <div>
                    <div className={styles.status_def_head}>
                    Deferred <span className={styles.status_count}>(0)</span>
                    </div>
                    <div className={styles.status_body}>
                        body
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Planner;