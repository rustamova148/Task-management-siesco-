import styles from "./Modal.module.css"

type ModalProps = {
  setUserModal?: (value: boolean) => void;
  setEditUserModal?: (value: boolean) => void;
  setEditTaskModal?: (value: boolean) => void;
  setTaskModal?: (value: boolean) => void;
  children?: React.ReactNode;
}

const Modal = ({setUserModal, setEditUserModal, setEditTaskModal, setTaskModal, children}: ModalProps) => {

const closeUserModal = () => {
setUserModal?.(false);
setEditUserModal?.(false);
setEditTaskModal?.(false);
setTaskModal?.(false);
}

const innerClick = (e: React.MouseEvent) => {
e.stopPropagation();
}

  return (
    <div className={styles.modal} onClick={closeUserModal}>
      <div className={styles.modalbox} onClick={innerClick}>
        {children}
      </div>
    </div>
  )
}

export default Modal