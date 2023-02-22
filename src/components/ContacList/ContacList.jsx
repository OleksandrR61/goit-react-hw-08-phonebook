import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { RotatingLines } from  'react-loader-spinner'

import { ContactElement } from "components";
import { selectContacts, selectIsLoading, selectError, selectIsUpdated, selectFilter } from 'redux/contacts/selectors';
import { fetchContacts } from 'redux/contacts/operations';

import styles from './ContactList.module.css';

const getContactsForRender = (contacts, filter) => {
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase().trim()));
};

export const ContacList = () => {
    const contacts = useSelector(selectContacts);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    const isUpdated = useSelector(selectIsUpdated);
    const filter = useSelector(selectFilter);
    
    const dispatch = useDispatch();

    const contactsForRender = filter
        ? getContactsForRender(contacts, filter)
        : contacts;

    useEffect(() => {
        if (isUpdated) {
            dispatch(fetchContacts());
        } else if (contacts.length === 0 && !isLoading) {
            Notify.info("Add your first contact please.");
        } else if (contactsForRender.length === 0 && !isLoading) {
            Notify.info("No contacts found for your request.");
        };
    }, [dispatch, isUpdated, contacts.length, contactsForRender.length, isLoading]);

    return (
        <>
            {
                isLoading && <RotatingLines width="288"/>
            }
            {
                !isLoading && !error && contactsForRender.length > 0 &&
                    <ul className={styles.contactList}>
                        {contactsForRender.map((contact) =>
                            <li key={contact.id}><ContactElement contact={contact}/></li>
                        )}
                    </ul>
            }
            {
                !isLoading && error && Notify.failure(error)
            }
        </>
    );
};