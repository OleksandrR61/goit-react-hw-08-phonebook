import { useSelector } from 'react-redux';

import { Navigation, UserMenu, AuthNav } from 'components';
import { selectIsLoggedIn } from 'redux/auth/authSelectors';

import styles from './NavBar.module.css';

export const NavBar = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <header className={styles.header}>
            <Navigation />
            {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </header>
    );
};