import { useSelector, useDispatch } from 'react-redux';

import { selectUserName } from 'redux/auth/authSelectors';
import { logOut } from 'redux/auth/authOperation';
import { cleanContacts } from 'redux/contacts/contactsSlice';

import styles from './UserMenu.module.css';

export const UserMenu = () => {
  const userName = useSelector(selectUserName);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logOut());
    dispatch(cleanContacts());
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>Welcome, {userName}</p>
      <button type="button" className='button' onClick={handleClick}>
        Logout
      </button>
    </div>
  );
};