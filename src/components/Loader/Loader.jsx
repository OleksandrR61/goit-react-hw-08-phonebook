import { RotatingLines } from  'react-loader-spinner';

import styles from './Loader.module.css';

export const Loader = () => <div className={styles.wrapper}><RotatingLines width="288"/></div>;