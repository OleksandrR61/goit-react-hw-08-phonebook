import { RegisterForm } from 'components';

import styles from './RegisterPage.module.css';

const RegisterPage = () => (
    <>
        <div className={styles.container}>
            <RegisterForm />
        </div>
    </>
);

export default RegisterPage;