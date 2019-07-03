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

}

export default Properties;