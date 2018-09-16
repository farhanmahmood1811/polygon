'use strict';

import mongoose from 'mongoose';

let ListingSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    city: {
        type: String,
        lowercase: true,
        required: true,
        index: true
    },
    state: {
        type: String,
        lowercase: true,
        required: true,
        index: true
    },
    country: {
        type: String,
        lowercase: true,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    rooms: {
        type: Number,
        default: 1
    },
    geo: {
		loc : [Number]
    },
    price: {
        type: Number,
        default: 0,
        required: true,
        index: true
    },
    description: {
        type: String,
        default: ""
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        required: true
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
		type: Date,
		default: Date.now
    }
});

ListingSchema.index({'geo.loc': '2d'})

ListingSchema.pre('save', function(next) {
	let listing = this;
    listing.modifiedAt = new Date();
    next()
});

export default mongoose.model('Listing', ListingSchema);