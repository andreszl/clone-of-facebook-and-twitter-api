import multer from 'multer';
import path from 'path';

const config = {
	destination: 'storage',
	filename: (req : Express.Request, file : Express.Multer.File, cb : Function) => { cb(null, `${Date.now()}${Math.random().toString()}${path.extname(file.originalname)}`); },
};

const storage = multer.diskStorage(config);

const upload = multer({ storage });

export default upload;
