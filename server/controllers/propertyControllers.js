import Joi from 'joi';
import {properties} from '../models/properties.js';

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
			image_url: ""
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
		const {error} = Properties.validateProperty(req.body)
		if (error){
		 	res.status(404).send({
		 		status:"error",
		 		message:error.details[0].message
		 	})
		 	return
		}

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
			image_url: ""
		};
		properties.push(property);
		res.status(200).send({
			status:"success",
			data: property
		})
	}

	static updateProAdvert(req, res){
		//Look up the property
		const property = properties.find((c)=>c.id === parseInt(req.params.propertyId));
		
		//If not existing return 404
		if(!property){
			res.status(404).send({
		 		status:"error",
		 		message:"The property with the given ID was not found"
		 	})
		 	return
		}

		//Validate
		const {error} = Properties.validateProperty(req.body)
		if (error){
		 	res.status(404).send({
		 		status:"error",
		 		message:error.details[0].message
		 	})
		 	return
		}

		//Update property
		property.owner = req.body.owner
		property.status = req.body.status
		property.price = req.body.price 
		property.state = req.body.state
		property.city = req.body.city
		property.address = req.body.address
		property.type = req.body.type
		property.created_on = req.body.created_on
		property.image_url = req.body.image_url
		
		//Return updated property
		res.status(200).send({
			status:"success",
			data: property
		})
	}

	static deleteSpecificRide(req, res){
		//Look up the property
		const property = properties.find((c)=>c.id === parseInt(req.params.propertyId));
		
		//If not existing return 404
		if(!property){
			res.status(404).send({
		 		status:"error",
		 		message:"The property with the given ID was not found"
		 	})
		 	return
		}

		const propertyIndex = properties.indexOf(property)
		properties.splice(propertyIndex, 1)
		//Return deleted property
		res.status(200).send({
			status:"success",
			data: property
		})
	}

}

export default Properties;