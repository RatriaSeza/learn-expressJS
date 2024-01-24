// core module
const fs = require("fs");

const dirPath = "./data";

if (!fs.existsSync(dirPath)) {
	fs.makeDirSync(dirPath);
}

if (!fs.existsSync(`${dirPath}/contacts.json`)) {
	fs.writeFileSync(`${dirPath}/contacts.json`, "[]", "utf8");
}

const loadContacts = () => {
	const users = fs.readFileSync("data/contacts.json", "utf8");
	const data = JSON.parse(users);
	return data;
}

const findContact = (id) => {
	const contacts = loadContacts();
	const contact = contacts.find((contact) => contact.id == id);

	return contact;
}

const findContactByEmail = (email) => {
	const contacts = loadContacts();
	const contact = contacts.find((contact) => contact.email == email);

	return contact;
}

const saveContatcs = (contacts) => {
	fs.writeFileSync("data/contacts.json", JSON.stringify(contacts, null, 2));
}

const addContact = (contact) => {
	const contacts = loadContacts();
	contact.id = generateKey(); // Generate a unique key for the contact
	contacts.push(contact);
	saveContatcs(contacts);
}

const generateKey = () => {
	const contacts = loadContacts();
	const keys = contacts.map((contact) => contact.id);
	const maxKey = Math.max(...keys);

	return maxKey + 1; 
}


module.exports = { loadContacts, findContact, addContact, findContactByEmail }