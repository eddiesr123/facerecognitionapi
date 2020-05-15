export default (db) => (req, res) => {
	const { id } = req.body;

	db('users')
		.increment('entries', 1)
		.where({ id })
		.returning('entries')
		.then(([ entries ]) => {
			if (entries) res.json(entries);
			else throw Error;
		})
		.catch((err) => res.status(400).json('User Not Found'));
};
