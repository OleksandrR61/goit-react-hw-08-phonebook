import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = ({contacts}) => contacts.items;
export const selectIsLoading = ({contacts}) => contacts.isLoading;
export const selectError = ({contacts}) => contacts.error;
export const selectIsUpdated = ({contacts}) => contacts.isUpdated;

export const selectFilter = ({filter}) => filter;

export const selectContactsFilter = createSelector(
    selectContacts,
    selectFilter,
    (contacts, filter) =>
        contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase().trim()))
);