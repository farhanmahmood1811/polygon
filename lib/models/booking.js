'use strict';

import mongoose from 'mongoose';

let BookingSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        index: true
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        required: true,
        index: true
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
        required: true,
        index: true 
    },
	createdAt: {
		type: Date,
		default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    }
});

BookingSchema.index({ user: 1, listing: 1 }, { unique: true })

BookingSchema.pre('save', function(next) {
    let booking = this;
    booking.modifiedAt = new Date();
    next();
});


export default mongoose.model('Booking', BookingSchema);
