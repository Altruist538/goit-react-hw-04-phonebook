import { useState, useEffect } from 'react';
import { ContactList } from './ContactList/ContactList';
import { GlobalStyle, Section } from './GlobalStyle';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';

function contactsLocalStorage() {
  const savedContacts = localStorage.getItem('contacts');
  if (savedContacts !== null) {
    return JSON.parse(savedContacts);
  } else {
    return [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  }
}

export function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(contactsLocalStorage);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const changeNameFilter = newName => {
    setFilter(newName);
  };

  const handleDelete = quizId => {
    setContacts(prevContacts =>
      prevContacts.filter(quiz => quiz.id !== quizId)
    );
  };

  const addQuiz = newContacts => {
    const isContactExists = contacts.find(
      contact =>
        contact.name.toLowerCase() === newContacts.name.toLowerCase() ||
        contact.number === newContacts.number
    );
    if (isContactExists) {
      return alert(`${newContacts.name} is already in contacts`);
    }
    setContacts(prevContacts => [...prevContacts, newContacts]);
  };

  const visibleQuizItems = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Section>
        <h1>Phonebook</h1>
        <ContactForm onAdd={addQuiz} />

        <h2>Contacts</h2>
        <Filter value={filter.name} onChange={changeNameFilter} />
        <ContactList contacts={visibleQuizItems} onDelete={handleDelete} />
      </Section>
      <GlobalStyle />
    </>
  );
}
