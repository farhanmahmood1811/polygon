'use strict';

import mongoose from 'mongoose';

let FilterSchema = mongoose.Schema({
	name: {
        type: String, 
        lowercase: true,
        required: true
    },
    filterType: { 
        type: String, 
        lowercase: true,
        required: true 
    }
});

CategorySchema.index({ name: 1, filterType: 1 }, { unique: true })

export default mongoose.model('Filter', FilterSchema);