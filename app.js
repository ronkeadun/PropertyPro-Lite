import express from 'express'; // load express module/library(import express from node modules)
import path from 'path';
import bodyParser from 'body-parser';

import propertyRoutes from "./server/routers/propertyRouters.js";
import validateProperty from './server/controllers/propertyControllers.js'

const app = express(); // create an instance of express for use

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/properties", propertyRoutes);


const port = process.env.PORT || 3000;

//start up application server
app.listen(port, ()=>{
	console.log(`Server is up and listening on port ${ port }`)
})

export default app;