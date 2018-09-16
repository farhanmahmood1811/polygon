"use strict";

import Listing from '../models/listing';
import BookingService from '../service/booking';
import QueryGeneratorService from '../service/queryGenerator';
import Constant from '../core/constant';

class ListingController {
    constructor() {
        this.limit = Constant.paging.listing + 1;
    }
    get = async (req, res, next) => {
        try {
            const listing = await Listing.findOne({_id:req.params.id})
                .populate({path: 'agent', select: 'name username'});
            if(!listing)
                return res.status(404).send('Listing not found')
            return res.status(200).send(listing)
        } catch(err) {
          	next(err);
        }
    }
    find = async (req, res, next) => {
        try {
            let query = QueryGeneratorService.listingMongoQuery(req.filter);
            let listings = await Listing.find(query)
                .sort({modifiedAt: -1})
                .limit(this.limit)
                .populate({path: 'agent', select: 'name username'});
            
            if(listings.length == this.limit) {
                const lastListing = listings.pop();
                const nextId = lastListing.modifiedAt.getTime()
                const nextUrl = req.protocol + "://" + req.headers.host + req.baseUrl + '?'+ QueryGeneratorService.listingQueryParams(query, nextId);
                res.set("Link", nextUrl)          
            }
            return res.status(200).send(listings)
        } catch(err) {
          	next(err);
        }
    }
    findByAgentId = async (req, res, next) => {
        try {
            let query = { agent: req.user._id };
            let listings = await Listing.find(query).sort({modifiedAt: -1})
            return res.status(200).send(listings)
        } catch(err) {
          	next(err);
        }
    }
    create = async (req, res, next) => {
        try {
        	let listing = new Listing(req.listing);
            await listing.save();
            return res.status(201).send("Listing Created Successfully")
        } catch(err) {
          	next(err);
        }
    }
    update = async (req, res, next) => {
        try {
            let listing = await Listing.findOneAndUpdate({_id:req.params.id}, req.listing, {new: true}).lean();
            if(!listing) 
                return res.status(404).send('Listing not found. Invalid Id')
            if(listing.agent.toString() != req.user._id)
                return res.status(405).send('You are not authorized to update. Listing belongs to someone else')
            return res.status(200).send("Listing Updated Successfully")
        } catch(err) {
          	next(err);
        }
    }
    remove = async (req, res, next) => {
        try {
            let listing = await Listing.findOneAndRemove({_id:req.params.id, agent: req.user._id}).lean();
            if(!listing) 
                return res.status(404).send('Listing not found. Invalid Listing Id')
            await BookingService.removeByListingId(req.params.id)
        	return res.status(200).send("Listing Removed Successfully")
        } catch(err) {
          	next(err);
        }
    }
}

export default new ListingController();