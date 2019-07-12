import Joi from 'joi';
import path from 'path';
import {properties} from '../models/properties.js';
import multer from 'multer';
import cloudinary from 'cloudinary';
import env from 'dotenv';

env.config();

//Set Storage Engine for uploading files with multer
const storage = multer.diskStorage({
	destination: './public/uploads/',
	filename : (req, file, cb)=>{
		cb(null, `${Date.now()}-${file.originalname}`);
	}
});

//Check File Type
const checkFileType = (file, cb)=>{
	//Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	//Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
	//Check mime
	const mimetype = filetypes.test(file.mimetype);

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
	fileFilter: (req,file,cb)=>{
		checkFileType(file,cb)
	}
}).single("image_url")

//Setting up cloudinary
cloudinary.config({
	cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
})


class Properties{
	static validateProperty (property){
		const schema = {
			id: Joi.number(),
			owner: Joi.string().min(3),
			status:Joi.string().required(),
			price: Joi.string(),
			state: Joi.string(),
			city: Joi.string(),
			address:Joi.string(),
			type:Joi.string(),
			created_on:Joi.string(), 
			image_url: Joi.string()
		}
		return Joi.validate(property, schema)
	}

	static getAllProAdvert(req, res){
		res.status(200).json({
		    status: 'success',
		    data: properties
		});
	}

	static getSpecificProAdvert(req, res){
		const property = properties.find((c)=>c.id === parseInt(req.params.propertyId));
		if(isNaN(req.params.propertyId)){
			res.send ("Property Id must be a number");
		}else if(!property){
			res.status(404).json({
			    status: 'error',
			    message: 'The property with the given ID was not found',
			});
		}
		else{
			res.status(200).json({
			    status: 'success',
			    data: property
			});
		}
	}

	static createProAdvert(req, res){
		upload(req, res, (err) =>{
			if(err){
				res.send({
					msg: err
				})	
			}else if(req.file == undefined){
				res.send("No file selected")
			}else{
				console.log(req.file)				
				cloudinary.v2.uploader.upload(req.file.path, (err,result)=>{
					req.body.image_url = result.secure_url
					const property = {
						id: properties.length + 1,
						owner: req.body.owner,
						status:req.body.status,
						price: req.body.price,
						state: req.body.state,
						city: req.body.city,
						address:req.body.address,
						type:req.body.type,
						created_on:req.body.created_on,
						image_url: req.body.image_url
					};
					const {error} = Properties.validateProperty(req.body)
					if (error){
					 	res.status(404).json({
					 		status:"error",
					 		message:error.details[0].message
					 	})
					 	return
					}
					properties.push(property);
					res.status(200).json({
						status:"success",
						data: property
					})
				})	
			}
		})		
	}

	static updateProAdvert(req, res){
		//Look up the property
		const property = properties.find((c)=>c.id === parseInt(req.params.propertyId));

		//If not existing return 404
		if(!property){
			res.status(404).json({
		 		status:"error",
		 		message:"The property with the given ID was not found"
		 	})
		 	return
		}
		upload(req, res, (err) =>{
			if(err){
				res.send({
					msg: err
				})	
			}else if(req.file == undefined){
				res.send("No file selected")
			}else{
				//Update property
				property.owner = req.body.owner,
				property.status =req.body.status,
				property.price = req.body.price,
				property.state = req.body.state,
				property.city = req.body.city,
				property.address =req.body.address,
				property.type =req.body.type,
				property.created_on =req.body.created_on,
				property.image_url = req.file.filename

				//Validate
				const {error} = Properties.validateProperty(req.body)
				if (error){
				 	res.status(404).json({
				 		status:"error",
				 		message:error.details[0].message
				 	})
				 	return
				}
				res.status(200).json({
					status:"success",
					data: property
				})
			}
		})
	}

	static updateProStatus(req, res){
		//Look up the property
		const property = properties.find((c)=>c.id === parseInt(req.params.propertyId));

		//If not existing return 404
		if(!property){
			res.status(404).json({
		 		status:"error",
		 		message:"The property with the given ID was not found"
		 	})
		 	return
		}else{
			//Update property status
			property.status ='Sold';
		}
		res.status(200).json({
			status:"success",
			data: property
		})
	}

	static findProType(req, res){
		//Look up the property
		const property = properties.find((c)=>c.id === parseInt(req.params.propertyId));
		let propertyFound = req.body;
		//If not existing return 404
		if(!property){
			res.status(404).json({
		 		status:"error",
		 		message:"The property with the given ID was not found"
		 	})
		 	return
		}else{
			//Update property status
			const { type } = req.query;
			propertyFound = properties.filter(props => (props.type === propertyType))

		}
		res.status(200).json({
			status:"success",
			data: propertyFound
		})
	}

	static deleteSpecificRide(req, res){
		//Look up the property
		const property = properties.find((c)=>c.id === parseInt(req.params.propertyId));
		
		//If not existing return 404
		if(!property){
			res.status(404).json({
		 		status:"error",
		 		message:"The property with the given ID was not found"
		 	})
		 	return
		}

		const propertyIndex = properties.indexOf(property)
		properties.splice(propertyIndex, 1)
		//Return deleted property
		res.status(200).json({
			status:"success",
			data: property
		})
	}

}

export default Properties;