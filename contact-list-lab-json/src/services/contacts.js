import axios from "axios";

const baseURL = "http://localhost:3001/contacts";

const getContacts = () => {
    return axios.get(baseURL).then((res) => res.data);
};


const addContact = async (contact) => {
    await axios.post(baseURL, contact);
    return getContacts()
};


const updateContact = async (contact) => { 
    await axios.put(`${baseURL}/${contact.id}`, contact);
    return getContacts();
};


const deleteContact = async (id) => {
    await axios.delete(`${baseURL}/${id}`);
    return getContacts()
};


export default { getContacts, addContact, deleteContact, updateContact };