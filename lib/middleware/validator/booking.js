class Booking {
    create = (req, res, next) => {
        let booking = {}
        if(!req.body.listing) {
            return res.status(400).send("Listing Id Required");
        } else if(!req.body.listing.trim().length) {
            return res.status(400).send("Listing Id Required");
        }
        booking.listing = req.body.listing.trim()
        booking.student = req.user._id;
        req.booking = booking;

        next();
    }
}

export default new Booking();