import Joi from 'joi';
import {properties} from '../models/properties.js';
import cloudinary from 'cloudinary';
import env from 'dotenv';
import upload from '../middleware/propertyMiddleware';


env.config();

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
			status:Joi.string(),
			price: Joi.string(),
			state: Joi.string(),
			city: Joi.string(),
			address:Joi.string(),
			type:Joi.string(),
			created_on:Joi.string(),
			image_url: Joi.string(),
			token: Joi.string() 	
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
				const id = properties.length + 1
				const token = req.headers.authorization.split(" ")[1]
				const {owner,status,price,state,city,address,type,created_on} = req.body;				
				cloudinary.v2.uploader.upload(req.file.path, (err,result)=>{
					req.body.image_url = result.secure_url
					const property = {
						id,
						owner,
						status,
						price,
						state,
						city,
						address,
						type,
						created_on,
						image_url: req.body.image_url,
						token
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
					res.status(201).json({
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
				property.token = req.headers.authorization.split(" ")[1]

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
		// let propertyFound = req.body;
		const type = req.query.type;
		console.log(type)
		//If not existing return 404
		if(!property){
			res.status(404).json({
		 		status:"error",
		 		message:"The property with the given ID was not found"
		 	})
		 	return
		}else if(type === req.body.type){
			//Update property status
			res.status(200).json({
				status:"success",
				data: property
			})
			/*const { type } = req.query;
			propertyFound = properties.filter(props => (props.type === propertyType))*/
		}else{
			return "Property not found"
		}
		
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