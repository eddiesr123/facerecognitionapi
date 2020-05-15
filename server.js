import express from 'express';
import cors from 'cors';
import db from './database.js';
import bcrypt from 'bcrypt-nodejs';
import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
import handleImageEntries from './controllers/image.js';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/signin', handleSignin(db, bcrypt));
app.post('/register', handleRegister(db, bcrypt));
app.get('/profile/:id', handleProfileGet(db));
app.put('/image', handleImageEntries(db));

app.listen(3000, () => {
	console.log('app is running on port 3000');
});
