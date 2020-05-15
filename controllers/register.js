export default (db, bcrypt) => (req, res) => {
	const { email, name, password } = req.body;
	if (email && name && password) {
		const hash = bcrypt.hashSync(password);
		db
			.transaction((trx) => {
				trx
					.insert({
						hash,
						email
					})
					.into('login')
					.returning('email')
					.then(([ email ]) => {
						return trx('users')
							.insert({
								email,
								name,
								joined: new Date()
							})
							.returning('*')
							.then(([ user ]) => {
								res.json(user);
							});
					})
					.then(trx.commit)
					.catch(trx.rollback);
			})
			.catch((err) =>
				res
					.status(400)
					.json(err.toString().includes('duplicate') ? 'Email already In Use' : 'Unable to Register')
			);
	} else res.status(400).json('Must complete all fields');
};
