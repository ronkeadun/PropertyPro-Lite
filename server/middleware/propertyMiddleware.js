import multer from 'multer';
import path from 'path';

//Set Storage Engine for uploading files with multer
const storage = multer.diskStorage({
	destination: './public/uploads/',
	filename : (req, file, cb)=>{
		cb(null, `${Date.now()}-${file.originalname}`);
	}
});

//Check File Type
const checkFileType = (req, file, cb)=>{
	//Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	//Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
	//Check mime
	const mimetype = filetypes.test(file.mimetype);
	//accept file
	if(extname && mimetype){
		return cb(null,true);
	}else{
		//cb("Error: Images only")
		cb(new Error("Only image files are allowed!"), false)
	}
}

//Initialize upload variable
const upload = multer({
	storage: storage,
	fileFilter: checkFileType
}).single("image_url")

export default upload;