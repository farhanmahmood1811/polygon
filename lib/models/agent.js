'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

let AgentSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		lowercase: true,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

AgentSchema.pre('save', function(next) {
	var agent = this;
	if (this.isNew) {
		bcrypt.genSalt(10, function(err, salt) {
			if (err) {
				return next(err);
			}
			bcrypt.hash(agent.password, salt, function(err, hash) {
				if (err) {
					return next(err);
				}
				agent.password = hash;
				next();
			});
		});
	} else {
		return next();
	}
});

AgentSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.password)
};

export default mongoose.model('Agent', AgentSchema);
