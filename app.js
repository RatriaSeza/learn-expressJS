const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContacts, findContact, addContact, findContactByEmail } = require('./utils/contacts');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts); // third-party middleware
app.use(express.static('public')); // built-in middleware
app.use(express.urlencoded({extended: true})); // built-in middleware

app.use(cookieParser('secret'));
app.use(session({
	cookie: {maxAge: 6000},
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(flash());

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
	res.render('contact/index', {title: 'Contact', layout: 'layouts/app', contacts, msg: req.flash('msg')});
})

app.get('/contact/create', (req,res) => {
	res.render('contact/create', {title: 'Contact | Create Data', layout: 'layouts/app'});
})

app.post('/contact', 	
	body('email').custom((value) => {
		const isDuplicate = findContactByEmail(value); 
		if (isDuplicate) {
			throw new Error('Email already registered');
		}
		return true;
	}),
	check('email', 'Invalid email format').isEmail(),
	check('name', 'Invalid name, min 3 characters').isLength({min: 3}),
	check('phoneNumber', 'Invalid phone number, min 11 characters').isLength({min: 11}),
	check('phoneNumber', 'Invalid phone number').isMobilePhone(),
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.render('contact/create', {title: 'Contact | Create Data', layout: 'layouts/app', errors: errors.array()});
		} else {
			addContact(req.body);
			req.flash('msg', 'Data contact successfully added');
			res.redirect('/contact');
		}
	}
);

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
