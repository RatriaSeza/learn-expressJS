const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.sendFile('/src/index.html', { root: __dirname });
})

app.get('/about', (req, res) => {
	res.sendFile('/src/about.html', { root: __dirname });
})

app.get('/user', (req, res) => {
	res.sendFile('/src/user.html', { root: __dirname });
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
