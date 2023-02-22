import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { selectContacts } from 'redux/contacts/selectors';
import { addContact } from 'redux/contacts/operations';

import styles from "./ContactForm.module.css";

export const ContactForm = () => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    const contacts = useSelector(selectContacts);
    
    const dispatch = useDispatch();

    const handleChange = ({target}) => {
        switch (target.name) {
            case "name": setName(target.value);
                break;
            case "number": setNumber(target.value);
                break;
            default: return;
        };
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = event.target.elements.name.value;
        const number = event.target.elements.number.value;

        if (contacts.every(contact =>
            contact.name !== name)) {
                dispatch(addContact({name, number}));
        } else {
            Notify.info(`${name} is already in contacts.`)
        }

        setName("");
        setNumber("");
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
                    Number

                    <input
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        className="input"
                        value={number}
                        onChange={handleChange}
                    />
                </label>
            </div>
    
            <button type="submit" name="submit" className="button">Add contact</button>
        </form>
    );
};