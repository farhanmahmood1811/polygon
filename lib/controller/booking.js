"use strict";

import Listing from '../models/listing';
import Booking from '../models/booking';
import Constant from '../core/constant';

class BookingController {
    constructor() {
        this.limit = Constant.paging.booking + 1;
    }
	create = async (req, res, next) => {
        try {
            const listing = await Listing.findOne({_id: req.booking.listing})
            if(!listing)
                return res.status(404).send('Listing not found')
            req.booking.agent = listing.agent;
            let booking = new Booking(req.booking);
            await booking.save();
			return res.status(201).send("Booking created successfully")
        } catch(err) {
          	next(err);
        }
    }
    findByAgentId = async (req, res, next) => {
        try {
            const bookings = await Booking.find({agent: req.user._id}).sort({modifiedAt: -1})
                .populate({path: 'listing', select: 'title city state country address'})
                .populate({path: 'student', select: 'name gender pictureUrl'})
            if(bookings.length == this.limit) {
                const lastBooking = bookings.pop()
                const nextId = lastBooking._id;
                const nextUrl = req.protocol + "://" + req.headers.host + req.baseUrl + '?'+ QueryGeneratorService.bookingQueryParams(nextId);
                res.set("Link", nextUrl) 
            }
            return res.status(200).send(bookings)
        } catch(err) {
            next(err);
        }
    }
}

export default new BookingController()