const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("dist"))

require('dotenv').config()
const port = process.env.port || 3001;

const cors = require("cors")
app.use(cors())

let contacts = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" },
]

app.post("/api/contacts", (req, res) => {
    const { name, email } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    } else if (!email) {
        return res.status(400).json({ error: "Email is required" });
    } else if (contacts.find(contact => contact.email == email) != undefined) {
        return res.status(409).json({ error: "Email is conflicted" });
    } else {
        const contact = {
            id: `${Date.now()}${Math.floor(Math.random() * 10000)}`,
            name,
            email,
        };
        contacts.push(contact);
        return res.status(201).json(contact);
    }
});

app.get("/api/contacts", (req, res) => {
    res.json(contacts);
});

app.get("/api/contacts/:id", (req, res) => {
    let id = req.params.id

    let contact_with_id = contacts.filter((contact) => contact.id == id)

    console.log(id)
    console.log(contact_with_id)

    if (contact_with_id.length != 0) {
        res.json(contact_with_id)
        return;
    }

    res.status(404).json({ "error": "Contact Not Found" });
});

app.delete("/api/contacts/:id", (req, res) => {
    let id = req.params.id

    let found = contacts.find((contact) => contact.id == id)

    console.log(found)

    if (found != undefined) {
        contacts = contacts.filter(contact => contact.id != id)
        res.status(204).json()
        return
    }

    console.log("HERE")

    res.status(404).json({ "error": "Contact Not Found" });
});

app.get("/api/info", (req, res) => {
    res.send(`<html>
        <body>
            <h1>Contacts Web Server</h1>
            <h2>Number of Contacts: ${contacts.length}</h2>
        </body>
        </html>
        `);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});