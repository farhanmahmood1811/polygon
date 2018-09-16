"use strict";

class Listing {
    find = (req, res, next) => {
        let reqQuery = {}
        if(req.query.state) {
            if(!req.query.state.trim().length) 
                return res.status(400).send("State can't be empty");
            reqQuery.state = req.query.state.trim().toLowerCase()
        }
        if(req.query.minPrice ){
            if(isNaN(parseInt(req.query.minPrice)))
                return res.status(400).send("Min Price Should Be Number");
            reqQuery.minPrice = parseInt(req.query.minPrice)
        }
        if(req.query.maxPrice ){
            if(isNaN(parseInt(req.query.maxPrice)))
                return res.status(400).send("Max Price Should Be Number");
            reqQuery.maxPrice = parseInt(req.query.maxPrice)
        }
        if(req.query.rooms){
            if(isNaN(parseInt(req.query.rooms)))
                return res.status(400).send("Rooms Should Be Number");
            reqQuery.rooms = parseInt(req.query.rooms)
        }
        if(req.query.latitude || req.query.longitude) {
            if(isNaN(parseFloat(req.query.latitude)) || isNaN(parseFloat(req.query.longitude)))
                return res.status(400).send("Latitude and Longitude should be a number");
            reqQuery.latitude = parseFloat(req.query.latitude)
            reqQuery.longitude = parseFloat(req.query.longitude)
        }
        req.filter = reqQuery;
        next()
    }
    create = (req, res, next) => {
        let listing = {};
        if(!req.body.title) {
            return res.status(400).send("Title Required");
        } else if(!req.body.title.trim().length) {
            return res.status(400).send("Title Required");
        }
        listing.title = req.body.title.trim();

        if(!req.body.city) {
            return res.status(400).send("City Required");
        } else if(!req.body.city.trim().length) {
            return res.status(400).send("City Required");
        }
        listing.city = req.body.city.trim();
        
        if(!req.body.state) {
            return res.status(400).send("State Required");
        } else if(!req.body.state.trim().length) {
            return res.status(400).send("State Required");
        }
        listing.state = req.body.state.trim();

        if(!req.body.country) {
            return res.status(400).send("Country Required");
        } else if(!req.body.country.trim().length) {
            return res.status(400).send("Country Required");
        }
        listing.country = req.body.country.trim();

        if(!req.body.address) {
            return res.status(400).send("Address Required");
        } else if(!req.body.address.trim().length) {
            return res.status(400).send("Address Required");
        }
        listing.address = req.body.address.trim();
        
        if(!req.body.rooms) {
            return res.status(400).send("Rooms Number Required");
        } else if(isNaN(parseInt(req.body.rooms))) {
            return res.status(400).send("Rooms Should Be A Number");
        }
        listing.rooms = parseInt(req.body.rooms);

        if(!req.body.price) {
            return res.status(400).send("Price Required");
        } else if(isNaN(parseInt(req.body.price))) {
            return res.status(400).send("Price Should Be A Number");
        }
        listing.price = parseInt(req.body.price);

        if(req.body.latitude && req.body.longitude) {
            if(isNaN(parseFloat(req.body.latitude)) || isNaN(parseFloat(req.body.longitude))) {
                return res.status(400).send("Latitude and Longitude should be a number");
            }
            listing.geo = [ parseFloat(req.body.longitude), parseFloat(req.body.latitude) ]
        }

        if(req.body.description) {
            listing.description = req.body.description.trim()
        }
        listing.agent = req.user._id;
        req.listing = listing;
        next()
    }
    update = (req, res, next) => {
        let listing = {};
        if(req.body.title) {
            if(req.body.title.trim().length) 
                listing.title = req.body.title.trim();
            else{
                return res.status(400).send("Title Cannot Be Empty");

            }
        }
        if(req.body.city) {
            if(req.body.city.trim().length) 
                listing.city = req.body.city.trim();
            else
                return res.status(400).send("City Cannot Be Empty");
        }
        
        if(req.body.state) {
            if(req.body.state.trim().length) 
                listing.state = req.body.state.trim();
            else
                return res.status(400).send("State Cannot Be Empty");
        }

        if(req.body.country) {
            if(req.body.country.trim().length) 
                listing.country = req.body.country.trim();
            else{
                return res.status(400).send("Country Cannot Be Empty");

            }
        }
        if(req.body.address) {
            if(req.body.address.trim().address) 
                listing.address = req.body.address.trim();
            else
                return res.status(400).send("Address Cannot Be Empty");
        }
        
        if(req.body.rooms) {
            if(!isNaN(parseInt(req.body.rooms)))
                listing.rooms = parseInt(req.body.rooms);
            else
                return res.status(400).send("Rooms should be a Number");
        }
        if(req.body.price) {
            if(!isNaN(parseInt(req.body.price)))
                listing.price = parseInt(req.body.price.trim())
            else
                return res.status(400).send("Price should be a Number");
        }

        if(req.body.latitude && req.body.longitude) {
            if(isNaN(parseFloat(req.body.latitude)) || isNaN(parseFloat(req.body.longitude))) {
                return res.status(400).send("Latitude and Longitude should be a number");
            }
            listing.geo = [ parseFloat(req.body.longitude), parseFloat(req.body.latitude) ]
        }
        
        if(req.body.description) {
            listing.description = req.body.description.trim()
        }
        
        if(!Object.keys(listing).length) {
            return res.status(400).send("No Valid Data To Update");
        }
        listing.modifiedAt = new Date();
        req.listing = listing;
        next()
    }
}

export default new Listing();
