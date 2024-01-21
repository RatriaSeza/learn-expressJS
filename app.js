const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);

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

app.get('/user', (req, res) => {
	res.render('user', {title: 'User', layout: 'layouts/app'});
})

app.get('/user/:id', (req, res) => {
	res.send(`User ${req.params.id} <br> Role ${req.query.role}`);
})

app.use('/', (req, res) => {
	res.status(404).send('Page not found');
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
})
