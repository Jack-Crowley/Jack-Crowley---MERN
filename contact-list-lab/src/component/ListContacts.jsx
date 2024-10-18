/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

export const ListContacts = ({ contacts }) => {
    const [filteredContacts, setFilteredContacts] = useState(contacts)
    const [filterText, setFilteredText] = useState("")

    useEffect(() => {
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
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts.map((contact, index) => (
                        <tr className={`green-row${(index % 2 == 0 ? "-dark" : "")}`} key={contact.id}>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                        </tr>
                    ))}
                    {filteredContacts.length == 0 && (
                        <tr className="green-row">
                            <td>No Contacts Found</td>
                            <td></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}