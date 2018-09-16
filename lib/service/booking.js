'use strict';

import Booking from "../models/booking";

class BookingService {
    removeByListingId = async (listingId) => {
        await Booking.remove({listing: listingId});
        return;
    }
}

export default new BookingService();