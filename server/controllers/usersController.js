import users from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Users{
	static findUser(prop, value) {
	    let userExist = null;
	    userExist = users.filter(user => user[prop] === value);
	    if (Object.keys(userExist).length !== 0) {
	      return userExist[0];
	    }
	    return null;
	}

	static findUserByEmail(email) {
	    return this.findUser('email', email);
	}

	//Handling User Registration
	static registerUser(req, res){
		const saltRounds = 10
		const id = users.length + 1
		const {email,first_name,last_name,password,phoneNumber,address} = req.body;
		const userRegistered = Users.findUserByEmail(email);
	    if (userRegistered) {
	        return res.status(409).json({
	          status: 'false',
	          error: `User with email ${email} already exists`
	        });
	   	}
		bcrypt.hash(req.body.password, saltRounds, (err,hash)=>{
			if(err){
				console.log("Verfication Error")
				return res.status(500).json({
					error : err,
					message : "can not create user"
				})
			}else {
				const user = {
					id : id,
					email,
					first_name,
					last_name,
					password : hash,
					phoneNumber,
					address,
					is_admin: false
				}
				users.push(user)
				//create token and return
				const token = jwt.sign({
						id : user.id,
						email: user.email
					},
					process.env.JWT_KEY,
					{
						expiresIn: "1h"
					}
				)
				res.status(200).json({
					status : "success",
					message : "User created",
					data: {
						token,
						user
					}
				})
			}
		})
	}

	//Handling User Login
	static userLogin(req, res){
		//Get user object
		const user = users.find((obj)=>{
			return obj.email === req.body.email
		})
	    if (!user) {
	        return res.status(401).json({
	          status: 'false',
	          error: `Authentication Failed`
	        });
	   	}
	   	bcrypt.compare(req.body.password,user.password, (err,result)=>{
	   		if(err){
	   			return res.status(401).json({
		          status: 'false',
		          error: `Authentication Failed`
		        });
	   		}
	   		if (result) {
	   			const token = jwt.sign({
	   				email: user.email,
	   				userId: user.id
	   			}, 
	   			process.env.JWT_KEY,
	   			{
	   				expiresIn:"1h"
	   			})
	   			return res.status(200).json({
	   				message: "Authentication successful",
	   				token,
	   				user
	   			})
	   		}
	   		res.status(401).json({
	          status: 'false',
	          error: `Authentication Failed`
	        });
	   	})
	}
}


export default Users;