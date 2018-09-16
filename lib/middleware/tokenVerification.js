"use strict";

import TokenService from '../service/token';

class TokenVerification {
	verify = (req, res, next) => {
		try {
			req.user = this._extractAndDecodeToken(req);
			next()
		} catch(e) {
			return res.status(401).send(e.message);
		}
	}
	user = (req, res, next) => {
		try {
			req.user = this._extractAndDecodeToken(req);
			if(req.user.isAgent) 
				return res.status(401).send("Invalid Token Type.");
			next()
		} catch(e) {
			return res.status(401).send(e.message);
		}
	}
	agent = (req, res, next) => {
		try {
			req.user = this._extractAndDecodeToken(req);
			if(!req.user.isAgent) 
				return res.status(401).send("Invalid Token Type.");
			next()
		} catch(e) {
			return res.status(401).send(e.message);
		}
	}
	_extractAndDecodeToken = (req) => {
		if(!req.headers.authorization) {
			throw new Error("Token not available in header")
		}
		if (req.headers.authorization.split(' ')[0] === 'Bearer') {
			let data = TokenService.verify(req.headers.authorization.split(' ')[1]);
			return data
		} else {
			throw new Error("Invalid Token")
		}
	}
}

export default new TokenVerification();