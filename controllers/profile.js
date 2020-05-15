export default (db) => (req, res) => {
	const { id } = req.params;
	db
		.select('*')
		.from('users')
		.where({ id })
		.then(([ user ]) => {
			if (user) res.json(user);
			else throw Error;
		})
		.catch((err) => res.status(400).json('User Not Found'));
};
