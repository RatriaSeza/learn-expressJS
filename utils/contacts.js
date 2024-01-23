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

module.exports = { loadContacts, findContact }