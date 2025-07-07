import styles from "./Planner.module.css"

const Planner = () => {
    return(
        <div className={styles.planner}>
            <div className={styles.planner_parts}>
                <div className={styles.planner_part}>
                    <div className={styles.status_todo_head}>
                      To do <span className={styles.status_count}>(0)</span>
                    </div>
                    <div className={styles.status_body}>
                        body
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