import { Router } from 'express';
import IndexController from '../controllers/index.controller';

class IndexRoutes {
	public router: Router = Router();
	public IndexController: IndexController;

	constructor() {
		this.IndexController = new IndexController();
		this.config();
	}

	config() {
		this.router.get('/test', this.IndexController.test);
		this.router.post('/query', this.IndexController.query);
	}
}

export default new IndexRoutes().router;
