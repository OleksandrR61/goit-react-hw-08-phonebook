import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { logIn } from 'redux/auth/authOperation';
import { updateContacts } from 'redux/contacts/contactsSlice';

import styles from "./LoginForm.module.css";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleChange = ({target}) => {
        const { value, name } = target;
        switch (name) {
            case "email": setEmail(value);
                break;
            case "password": setPassword(value);
                break;
            default: return;
        };
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(logIn({email, password}));
        dispatch(updateContacts());

        setEmail("");
        setPassword("");
        event.target.elements.submit.blur();
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formInputs}>
                <label>
                    Email

                    <input
                        type="email"
                        name="email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        title="Email must be valid. For example adrian@mail.com"
                        required
                        className="input"
                        value={email}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Password

                    <input
                        type="password"
                        name="password"
                        required
                        className="input"
                        value={password}
                        onChange={handleChange}
                    />
                </label>
            </div>
    
            <button type="submit" name="submit" className="button">Login</button>
        </form>
    );
};