import React, { useEffect } from 'react';
import css from './contactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContacts,
  deleteContactAsync,
} from 'components/redux/contactDataReducer';
import Loader from 'components/Loader/loader';
import {
  selectError,
  selectIsLoading,
  selectItems,
} from 'components/redux/products.selectors';
import { ErrorMessage } from 'components/Error/errorMessage';

const ContactsList = () => {
  const contacts = useSelector(selectItems);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}

      <ul className={css.contactsList}>
        {contacts !== undefined &&
          contacts.map(contact => (
            <li key={contact.id} className={css.contactsItem}>
              <span className={css.textContact}>
                {contact.name}: {contact.phone}
              </span>
              <button
                className={css.button}
                onClick={() => dispatch(deleteContactAsync(contact.id))}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ContactsList;
