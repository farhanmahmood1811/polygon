'use strict';

import mongoose from 'mongoose';

let StudentSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
    },
    provider: {
        type: String,
        required: true,
        lowercase: true
    },
    gender: {
        type: String
    },
    pictureUrl: {
        type: String,
        default: "",
    },
	id: {
		type: String,
		unique: true,
		required: true
	},
    tokens: {
        type: Object
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

StudentSchema.pre('save', function(next) {
	let student = this;
    student.modifiedAt = new Date();
    next()
});

export default mongoose.model('Student', StudentSchema);
