import styles from './HomePage.module.css';

const HomePage = () => (
    <>
        <div className={styles.container}>
            <h1 className={styles.text}>
                Hello world!<br/>
                I'm a Phonebook App
            </h1>
        </div>
    </>
);

export default HomePage;