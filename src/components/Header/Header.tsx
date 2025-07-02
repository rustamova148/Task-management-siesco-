import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.css';
import type { RootState } from '../../redux/app/store';
import { clearUser } from '../../redux/features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const user = useSelector((state: RootState) => state.user.currentUser);
const handleLogout = () => {
dispatch(clearUser());
localStorage.removeItem('user');
navigate('/signin');
}
  return (
    <div className={styles.header_container}>
        <p className={styles.header_head}>Task Manager</p>
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
  )
}

export default Header
