import express from 'express';
import cors from 'cors';
import db from './database.mjs';
import bcrypt from 'bcrypt-nodejs';
import { handleRegister } from './controllers/register.mjs';
import { handleSignin } from './controllers/signin.mjs';
import { handleProfileGet } from './controllers/profile.mjs';
import { handleImageEntries, handleApiCall } from './controllers/image.mjs';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));

app.get('/', (req, res) => res.send('It is Working!'));
app.post('/signin', handleSignin(db, bcrypt));
app.post('/register', handleRegister(db, bcrypt));
app.get('/profile/:id', handleProfileGet(db));
app.put('/image', handleImageEntries(db));
app.post('/imageurl', handleApiCall);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`app is running on port ${PORT}`);
});
