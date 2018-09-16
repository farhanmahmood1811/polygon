# Weavedin Notification Feed!
Express , Nodejs, Mongodb

## Setup and Dependency
#### Mongodb version > 3.6 and NodeJS version >10
> `> npm install`
> `> npm start`

# Student login api (Google Login)
Got to http://localhost:3000/auth/google
Response:
    {
        name: String,
        _id: String,
        token: String
    }

Token is passed as authorized header in each request to validate request on server end.

