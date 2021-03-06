import jwt from 'jsonwebtoken';
import upload from './propertyMiddleware.js';

export default (req, res, next)=>{
	try{
		const token = req.headers.authorization.split(" ")[1]
		const decoded = jwt.verify(token, process.env.JWT_KEY)
		req.userData = decoded
		next()
	}catch (error){
		return res.status(403).json({
			error: "Authentication Failed"
		})
	}
}