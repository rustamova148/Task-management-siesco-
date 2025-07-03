import Modal from "../Modal/Modal";
import styles from "./UsersModalWrapper.module.css";

const UsersModalWrapper = ({setUserModal}:{ setUserModal: (value: boolean) => void }) => {

  return (
    <Modal setUserModal={setUserModal}>
      <form className={styles.users_form}>
        <label htmlFor="orgname">Organization name:</label> 
        <input type="text" name="orgname" id="orgname" className={styles.users_input} /> 

        <label htmlFor="username">User Name:</label> 
        <input type="text" name="username" id="username" className={styles.users_input} /> 

        <label htmlFor="useremail">User Email:</label>
        <input type="email" name="useremail" id="useremail" className={styles.users_input} /> 
        <button type="submit" className={styles.add_user_submit}>Submit</button>
      </form>
    </Modal>
  );
};

export default UsersModalWrapper;