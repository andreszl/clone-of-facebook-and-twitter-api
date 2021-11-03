import fs from 'fs';
import { ObjectId } from 'mongodb';
import { md5 } from '../../utils/hash.util';

const users = [
	{
		_id: { $oid: new ObjectId() },
		name: 'admin',
		email: 'admin@admin.com',
		password: md5('123456789'),
		timestamp: {
			created_at: { $date: new Date() },
			updated_at: { $date: new Date() },
		},
	},
];

fs.writeFile('./database/seeders/data/users.seed.json', JSON.stringify(users), (err) => {
	if (err) {
		console.log(err);
	}
	console.log('Users data generated');
});

export default users;
