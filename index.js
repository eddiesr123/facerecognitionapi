import express from 'express';
import cors from 'cors';
import db from './database.js';
import bcrypt from 'bcrypt-nodejs';
import { handleRegister } from './controllers/register.js';
import { handleSignin } from './controllers/signin.js';
import { handleProfileGet } from './controllers/profile.js';
import { handleImageEntries, handleApiCall } from './controllers/image.js';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));

app.post('/signin', handleSignin(db, bcrypt));
app.post('/register', handleRegister(db, bcrypt));
app.get('/profile/:id', handleProfileGet(db));
app.put('/image', handleImageEntries(db));
app.post('/imageurl', handleApiCall);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`app is running on port ${PORT}`);
});
