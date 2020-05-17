import knex from 'knex';

const db = knex({
	client: 'pg',
	connection: {
		host: process.env.DATABASE_URL,
		ssl: true
	}
});

export default db;
