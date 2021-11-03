import { Router } from 'express';
import Controller from '../controllers/posts.controller';

export default new class AuthRoutes {
	public router: Router = Router();
	public Controller: Controller;

	constructor() {
		this.Controller = new Controller();
		this.config();
	}

	config() {
		this.router.post('/store', this.Controller.store);
		this.router.post('/toogleLike', this.Controller.toogleLike);
		this.router.post('/addComment', this.Controller.addComment);
	}
}().router;
