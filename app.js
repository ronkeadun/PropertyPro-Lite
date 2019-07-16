import express from 'express'; // load express module/library(import express from node modules)
import path from 'path';
import morgan from 'morgan';
import bodyParser from "body-parser";


import propertyRoutes from "./server/routes/propertyRouters.js"; 
import usersRoutes from "./server/routes/usersRouters.js"; 



const app = express(); // create an instance of express for use

app.use(express.static("UI"));
app.use("/public/uploads", express.static("public/uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(morgan('dev'))

app.use((req, res, next)=>{
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With, Origin, Accept, Authorization")
	if(req.method === "OPTIONS"){
		res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, DELETE, GET")
		return res.status(200).json({})
	} 
	next()
})

app.use("/api/v1/properties", propertyRoutes);
// app.use("/api/v1/users", usersRoutes);



app.use((req, res, next)=>{
	res.sendStatus(404);
});

app.use((err, req, res, next)=>{
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: req.app.get("env") === "development" ? err : {}
	})
});


const port = process.env.PORT || 3000;

//start up application server
app.listen(port, ()=>{
	console.log(`Server is up and listening on port ${ port }`)
})

export default app;