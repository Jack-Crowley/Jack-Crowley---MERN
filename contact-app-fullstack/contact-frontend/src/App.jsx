import { useState, useEffect } from "react";
import "./app.css";
import { AddContact } from "./component/AddContact"
import { ListContacts } from "./component/ListContacts"
import contactServices from "./services/contacts";

const App = () => {
  const [contacts, setContacts] = useState();
  const [ids, setIds] = useState(0)

  useEffect(() => {
    contactServices.getContacts().then((data) => {
      setContacts(data)
      setIds(data.length)
    });
    
  }, []);

  const handleUpdate = (name, email) => {
    const contact = contacts.find(contact => contact.name == name);

    contactServices.updateContact({ id:contact.id, name, email }).then((res) => {
      setContacts(res)
    })
  }


  const validateName = (newName) => {
    if (newName.trim().length == 0) {
      return false;
    }

    return true;
  }

  const handleSubmit = (e, newName, newEmail, setNewName, setNewEmail) => {
    e.preventDefault()

    if (!validateName(newName)) {
      return;
    }

    if (contacts.some((x) => x.name == newName)) {
      handleUpdate(newName, newEmail)
      return;
    }

    if (newEmail.trim().length == 0) {
      alert("You need to add an email address")
      return false;
    }

    contactServices.addContact({ name: newName.trim(), id: `${ids+1}`, email: newEmail }).then((res) => {
      setContacts(res)
    })

    setIds(ids+1)
    setNewName("")
    setNewEmail("")
  }

  const handleDelete = (id) => {
    contactServices.deleteContact(id).then((res) => {
      setContacts(res)
    })
  }

  return (


    <div className="contacts-app" >
      <AddContact handleSubmit={handleSubmit} />
      <ListContacts contacts={contacts} deleteContact={handleDelete} />
    </div>
  );
};

export default App;