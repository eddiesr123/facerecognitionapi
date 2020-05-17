import Clarifai from 'clarifai';

const app = new Clarifai.App({
	apiKey: '70983d9082194b279f4e85ad90bde4d4'
});

export const handleApiCall = (req, res) => {
	const { imageUrl } = req.body;
	app.models.predict(Clarifai.FACE_DETECT_MODEL, imageUrl).then((data) => res.json(data)).catch(console.log);
};

export const handleImageEntries = (db) => (req, res) => {
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
