import jwt from 'jsonwebtoken';
import upload from './propertyMiddleware.js';

export default (req, res, next)=>{
	try{
		const decoded = jwt.verify(req.body.token, process.env.JWT_KEY)
		req.userData = decoded
		next()
	}catch (error){
		return res.status(401).json({
			message: "Authentication Failed"
		})
	}
}