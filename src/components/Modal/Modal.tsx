import styles from "./Modal.module.css"

type ModalProps = {
  setUserModal?: (value: boolean) => void;
  setEditModal?: (value: boolean) => void;
  children?: React.ReactNode;
}

const Modal = ({setUserModal, setEditModal, children}: ModalProps) => {

const closeUserModal = () => {
setUserModal?.(false);
setEditModal?.(false);
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