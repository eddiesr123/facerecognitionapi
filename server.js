import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@email.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@email.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	]
};

const getUser = (id) => {
	const [ user ] = database.users.filter((user) => user.id === id);
	return user;
};

app.get('/', (req, res) => {
	res.json(database.users);
});

app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
		res.json(database.users[0]);
	} else {
		res.status(400).json('error logging in');
	}
});

app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	database.users.push({
		id: `12${Math.floor(Math.random() * 10).toString()}`,
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	});
	res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	const user = getUser(id);
	user ? res.json(user) : res.status(400).json('no such user');
});

app.put('/image', (req, res) => {
	const { id } = req.body;
	const user = getUser(id);
	if (user) {
		user.entries++;
		res.json(user.entries);
	} else {
		res.status(400).json('user not found');
	}
});

app.listen(3000, () => {
	console.log('app is running on port 3000');
});
