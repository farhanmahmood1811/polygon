
# Weavedin Notification Feed!

Express , Nodejs, Mongodb

  

## Setup and run

> docker-compose up -d --force-recreate --build
 Access Apis on localhost:3000

 Access Logs using docker-compose logs -f 

  

# Student login api (Google Login)

Go to http://localhost:3000/auth/google

Response:

{ 		
		name: String,
		_id: String,
		token: String
} 

Token is passed as authorized header in each request to validate request on server end.

For detail documentation on apis and usage navigate to this link
https://documenter.getpostman.com/view/4381437/RWaKU99G

  

# Timeline and planning:

The complete project implemented in following phase and average time required to complete the phase

  

### Entity planning, database design of each entity ~ 2hrs

- Entites defined are Student, Agent, Listing and Booking and schema defined for each.

  

### Initial project structure, framework integration and docker setup ~ 1hr

 Folder structure and docker setup for nodejs and mongodb. Folder structure in detail : 
- controller - to hold business logic and database operations

- core folder hold config, database connection setup and constants

- middleware for express middleware for authentication and request validation

- models for mongodb collection schema

- routes for diffing endpoint

- services to aggregate common functionality.

  

### Api design, relation between entities and index planning to support get apis. ~ 2hrs

- Relationship defined between entities and to support fetch request index added.

- Interface for Api for listing, booking and authentication.

  

### Authentication Module ~ 3hrs

- Agent Auth implementation ~ 1hr

	- Register: /agent/auth/register

	- Login: /agent/auth/login

	- Middleware validator to validate required data for register and login.

- Student Google Auth Implementation - 2hrs

	- Login: /auth/google

	- OauthCallback: /auth/google/callback

  

### Listing Apis ~ 3hrs

- Implemnation of Create, Update, Delete and fetch operation

- Request validator method to validate client sent data for Create and Update and Fetch Api.

- Implementation of fetch listing api with pagination logic and supporting multiple filters such as state, number of rooms, price range and latitude and longitude

- Query Genrator to transform filters to mongo query and mongo query to url query (used in case of pagination), to improve modularity

  
#### Booking Apis ~ 1.5hr

- Implementation of booking request

- Implemenattion to fetch an agent bookings

- Middleware Validator for request validation

  
### Postman Integration and documentation during the development phase of authentication, listing and booking api ~ 2hr
