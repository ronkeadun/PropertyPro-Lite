# PropertyPro-Lite


## Table of Contents
* [Project Overview](#project-overview)
* [Required Features](#required-features)
* [Technologies](#technologies)
* [Installation and Setup](#installation-and-setup)
* [Limitations](#limitations)
* [Testing](#testing)
* [API Endpoints](#api-endpoints)
* [How to Contribute](#how-to-contribute)
* [License](#license)

# Project Overview
Property Pro Lite is a platform where people can create and/or search properties for sale or rent.

## Required Features
PropertyPro-Lite consists of the following features:
### Authentication
- It uses JSON Web Token (JWT) for authentication.
- Token is generated on user login
- Token is perpetually verified to check the state of the user if logged in or not.
- User is assigned normal role on registration

### Normal Users
- User can sign up.  
- User can sign in.    
- User can view all properties adverts.  
- User can view all properties of a specific type - 2 bedroom, 3 bedroom, mini flat etc.  
- User can view a specific property advert. 

### Agent Users
- User (agent) can post a property advert.  
- User (agent) can update the details of a property advert.  
- User (agent) can mark his/her posted advert as sold.  
- User (agent) can delete a property advert.


## Technologies
**PropertyPro-Lite** makes use of a lot of modern technologies. The core ones are:
* NodeJS: Node.js is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code on the server-side. See [this link](https://en.wikipedia.org/wiki/Node.js) for details.
* ExressJS: ExpressJS, is a web application framework for Node.js, It is designed for building web applications and APIs.
    See [this link](https://en.wikipedia.org/wiki/Express.js) for details.
* JWT: Json Web Token is a secure base 64 URL encoded JSON object based protocol for transmitting restricted data.
* Eslint 
* Babel 
* Mocha 
* Chai 
* Cloudinary
* Postgresql

## Installation and Setup
1. Clone the repository:
```
https://github.com/ronkeadun/PropertyPro-Lite
```
2. Navigate into the cloned repository:
```
cd PropertyPro-Lite
```
3. Install dependencies:
```
npm install
```
4. Create Postgresql database:
```

```
5. Create a `.env` file in the root directory of the application. Use a different database for your testing and development. Example of the content of a .env file looks like this
```
PRIVATE_KEY=myprivatekey
TEST_DATABASE_URL=postgres://127.0.0.1:5432/propertypro-lite-test
```
6. Start the application:
**_Different Build Environment_**

**Production**
```
npm run production
```
**Development**
```
npm run start:dev
```
7. Install **Postman** and use to test all endpoints 

## Limitations
The application can not display a Google Map with Marker showing the red-flag or intervention location. 

## Testing
- To test run `npm test` or `npm run test`

## API Endpoints
**Do not forget to include token in header of all authenticated routes.**

Request type | Endpoint                                   | Action
-------------|--------------------------------------------|--------------------------------------------------
POST         | /api/v1/users/auth/signup                  | Create user account
POST	     | /api/v1/users/auth/signin                  | Login a user
POST         | /api/v1/properties	                      | Create a property advert
PATCH	     | /api/v1/property/<:property-id>            | Update property data
PATCH	     | /api/v1/property/<:property-id>/sold       | Mark a property as sold so it’s no longer available
DDELETE      | /api/v1/property/<:property-id>            | Delete a property advert
GET          | /api/v1/property                           | Get all property adverts
GET	         | /api/v1/property/<:property-id>            | View a specific property advert
GET          | /property/<:property-id>?type=​propertyType | Get all property advertisement offering a specific type

## How to Contribute
Contributions to this project are welcome, if you need to contribute to this project, kindly take steps below
* **Fork** the repository
* Follow [Installation and Setup](#installation-and-setup) as explained earlier
* Create a branch off **develop** for the feature you wish to add
* Make neccessary changes, commit and raise a pull request against develop
**Note** when making contributions, please endevour to follow the [Airbnb](https://github.com/airbnb/javascript) javascript style guide.

## License
This project is authored by **Aderonke Fadare** (ronkeadun1@yahoo.com) and is licensed for your use, modification and distribution under the **MIT** license.
[MIT][License] &copy;  [Aderonke Fadare][author]