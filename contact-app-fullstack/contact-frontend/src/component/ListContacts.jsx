/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

export const ListContacts = ({ contacts, deleteContact }) => {
    const [filteredContacts, setFilteredContacts] = useState("loading")
    const [filterText, setFilteredText] = useState("")

    useEffect(() => {
        if (contacts == null) {
            setFilteredContacts("loading")
            return;
        }

        let newFilteredText = filterText.toLowerCase()
        setFilteredContacts(contacts.filter((contact) => contact.name.toLowerCase().includes(newFilteredText)))
    }, [contacts, filterText])

    const updateFilteredText = (e) => {
        let newFilteredText = e.target.value;
        setFilteredText(newFilteredText)

        if (newFilteredText.trim().length == 0) {
            setFilteredContacts(contacts)
            return;
        }
    }

    return (
        <div>
            <h2>Contact List</h2>
            <input type="text" placeholder="Search" value={filterText} onChange={updateFilteredText} />
            <table className="contact-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts != "loading" && filteredContacts.map((contact, index) => (
                        <tr className={`green-row${(index % 2 == 0 ? "-dark" : "")}`} key={contact.id}>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>
                                <button className="button" onClick={() => {deleteContact(contact.id)}}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {filteredContacts != "loading" && filteredContacts.length == 0 && (
                        <tr className="green-row">
                            <td>No Contacts Found</td>
                            <td></td>
                        </tr>
                    )}
                    {filteredContacts == "loading" && (
                        <tr className="green-row">
                            <td>Loading</td>
                            <td></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}