import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { register } from 'redux/auth/authOperation';
import { updateContacts } from 'redux/contacts/contactsSlice';

import EyeImg from 'svg/eye.svg';
import EyeOffImg from 'svg/eye-off.svg';

import styles from "./RegisterForm.module.css";

export const RegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isWatch, setIsWatch] = useState(false);

    const dispatch = useDispatch();

    const handleChange = ({ target }) => {
        const { name, value } = target; 
        switch (name) {
            case "name": setName(value);
                break;
            case "email": setEmail(value);
                break;
            case "password": setPassword(value);
                break;
            default: return;
        };
    };

    const handleClick = () => {
        setIsWatch(prev => !prev);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(register({name, email, password}));
        dispatch(updateContacts());

        setName("");
        setEmail("");
        setPassword("");
        event.target.elements.submit.blur();
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formInputs}>
                <label>
                    Name
    
                    <input
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        className="input"
                        value={name}
                        onChange={handleChange}
                    />
                </label>

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
                        type={isWatch ? "text" : "password"}
                        name="password"
                        required
                        className="input"
                        value={password}
                        onChange={handleChange}
                    />
                </label>

                <button
                    type="button"
                    onClick={handleClick}
                    className={styles.img}>
                        <img src={isWatch ? EyeImg : EyeOffImg} alt="watch password" />
                </button>
            </div>
    
            <button
                type="submit"
                name="submit"
                className="button"
            >
                Register
            </button>
        </form>
    );
};