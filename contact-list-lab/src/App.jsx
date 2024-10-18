import { useState } from "react";
import "./app.css";
import { AddContact } from "./component/AddContact"
import { ListContacts } from "./component/ListContacts"

const App = () => {

  const [contacts, setContacts] = useState([
    { name: "John Doe", email: "johndoe@gmail.com", id: 1 },
    { name: "Jane Smith", email: "janesmith@gmail.com", id: 2 },
    { name: "Michael Johnson", email: "michaeljohnson@gmail.com", id: 3 },
    { name: "Emily Davis", email: "emilydavis@gmail.com", id: 4 },
    { name: "David Brown", email: "davidbrown@gmail.com", id: 5 },
  ]);

  const validateName = (newName) => {
    if (newName.trim().length == 0) {
        return false;
    }

    if (contacts.some((x) => x.name == newName)) {
        alert(`${newName.trim()} is already in contacts`)
        return false;
    }

    return true;
}

  const handleSubmit = (e, newName, newEmail, setNewName, setNewEmail) => {
    e.preventDefault()

    if (!validateName(newName)) {
      return;
    }

    if (newEmail.trim().length == 0) {
      alert("You need to add an email address")
      return false;
    }

    setContacts([...contacts, { name: newName.trim(), id: contacts.length + 1, email: newEmail }])
    setNewName("")
    setNewEmail("")
  }

  return (
    

    <div className = "contacts-app" >
      <AddContact handleSubmit={handleSubmit}/>
      <ListContacts contacts={contacts}/>
    </div >
  );
};

export default App;