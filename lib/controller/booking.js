"use strict";

import Listing from '../models/listing';
import Booking from '../models/booking';

class BookingController {
	create = async (req, res, next) => {
        try {
            const listing = await Listing.findOne({_id: req.booking.listingId})
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
            return res.status(200).send(bookings)
        } catch(err) {
            next(err);
        }
    }
}

export default new BookingController()