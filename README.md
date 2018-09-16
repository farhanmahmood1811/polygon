# Weavedin Notification Feed!
Express , Nodejs, Mongodb

## Setup and run
> docker-compose up

# Student login api (Google Login)
Go to http://localhost:3000/auth/google
Response:
    {
        name: String,
        _id: String,
        token: String
    }

Token is passed as authorized header in each request to validate request on server end.

For detail documentation navigate to this link
https://documenter.getpostman.com/view/4381437/RWaKU99G