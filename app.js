const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContacts, findContact } = require('./utils/contacts');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// third-party middleware
app.use(expressLayouts);

// built-in middleware
app.use(express.static('public'));

app.get('/', (req, res) => {
	const students = [{
		name: 'Satria',
		email: 'satria@example.com'
	}, {
		name: 'Aji',
		email: 'aji@example.com'
	}, {
		name: 'Rama',
		email: 'rama@example.com'
	}]
	res.render('index', {name: 'Satria', title: 'Home', students, layout: 'layouts/app'});
})

app.get('/about', (req, res) => {
	res.render('about', {title: 'About', layout: 'layouts/app'});
})

app.get('/contact', (req, res) => {
	const contacts = loadContacts();
	res.render('contact', {title: 'Contact', layout: 'layouts/app', contacts});
})

app.get('/contact/:id', (req, res) => {
	const contact = findContact(req.params.id);
	res.render('detail', {title: `Contact's Detail`, layout: 'layouts/app', contact});
})

app.use('/', (req, res) => {
	res.status(404).send('Page not found');
})

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
})
