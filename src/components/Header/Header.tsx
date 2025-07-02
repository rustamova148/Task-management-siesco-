import { useSelector } from 'react-redux';
import styles from './Header.module.css';
import type { RootState } from '../../redux/app/store';

const Header = () => {
const user = useSelector((state: RootState) => state.user.currentUser);
  return (
    <div className={styles.header_container}>
        <p className={styles.header_head}>Task Manager</p>
        <div>
           {user?.name} ({user?.role})
        </div>
    </div>
  )
}

export default Header
