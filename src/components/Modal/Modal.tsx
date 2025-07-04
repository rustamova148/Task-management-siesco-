import styles from "./Modal.module.css"

type ModalProps = {
  setUserModal?: (value: boolean) => void;
  setEditUserModal?: (value: boolean) => void;
  setEditTaskModal?: (value: boolean) => void;
  setTaskModal?: (value: boolean) => void;
  setOpenMenuId?: (value: number | null) => void;
  setOpenTaskMenuId?: (value: number | null) => void;
  onClose?: () => void;
  children?: React.ReactNode;
}

const Modal = ({setUserModal, setEditUserModal, setEditTaskModal, setTaskModal, 
setOpenMenuId, setOpenTaskMenuId, children}: ModalProps) => {

const closeUserModal = () => {
setUserModal?.(false);
setEditUserModal?.(false);
setEditTaskModal?.(false);
setTaskModal?.(false);
setOpenMenuId?.(null);
setOpenTaskMenuId?.(null);
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