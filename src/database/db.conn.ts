import { MongoClient, Db } from 'mongodb'; // eslint-disable-line no-unused-vars
import { isEmpty } from 'lodash';
import config from 'config';

class Database {
	private host : string;
	private port : number;
	public dbname : string;
	public connection ?: MongoClient;

	constructor() {
		this.host = config.get('mongo.host');
		this.port = config.get('mongo.port');
		this.dbname = config.get('mongo.dbname');
	}

	public async getInstance(): Promise<Db> {
		try {
			if (isEmpty(this.connection)) {
				await this.connect();
			}
			if (this.connection !== undefined) {
				return this.connection.db(this.dbname);
			}
			throw Error;
		} catch (err) {
			console.log(`Error get database ${err}`);
			throw err;
		}
	}

	public async connect() {
		try {
			this.connection = await MongoClient.connect('mongodb://127.0.0.1:27017/clone-of-facebook-and-twitter', { useUnifiedTopology: true });
			console.log('Database created!');
		} catch (err) {
			console.log(err);
			throw err;
		}
	}

	public disconnect() {
		try {
			if (this.connection !== undefined) {
				this.connection.close();
			}
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
}

export default new Database().getInstance();