export const handleSignin = (db, bcrypt) => (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json('Must complete all fields');
	}
	db
		.select('email', 'hash')
		.from('login')
		.where({ email })
		.then(([ { hash } ]) => {
			const isValid = bcrypt.compareSync(password, hash);
			if (isValid) {
				return db
					.select('*')
					.from('users')
					.where({ email })
					.then(([ user ]) => {
						res.json(user);
					})
					.catch((err) => res.status(400).json('unable to get user'));
			} else throw Error;
		})
		.catch((err) => res.status(400).json('invalid credentials'));
};
