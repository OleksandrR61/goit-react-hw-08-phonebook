import { LoginForm } from 'components';

import styles from './LoginPage.module.css';

const LoginPage = () => (
    <>
        <div className={styles.container}>
            <LoginForm />
        </div>
    </>
);

export default LoginPage