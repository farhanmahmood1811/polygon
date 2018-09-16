"use strict";

import Agent from '../models/agent';
import TokenService from '../service/token';

class AgentAuthController {
	register = async (req, res, next) => {
        try {
        	let agent = new Agent(req.agentAuth);
        	agent.isNew = true;
        	await agent.save();
        	return res.status(201).send("Agent Created successfully")
        } catch(err) {
          	next(err);
        }
    }
    login = async (req, res, next) => {
    	try {
			let agent = await Agent.findOne({username: req.agentAuth.username});
    		if(!agent) {
    			return res.status(401).send('Authentication failed. Invalid Username.');
    		}
    		if (!agent.comparePassword(req.agentAuth.password)) {
        		return res.status(401).send('Authentication failed. Wrong password.');
      		} else {
				const data = { id: agent.username, _id: agent._id, isAgent: true}
				const token = TokenService.generate(data);
				const bearerToken = `Bearer ${token}`;
				return res.status(200).send({name: agent.name, token: bearerToken});
      		}
    	} catch(err) {
    		next(err);
    	}
    }
}

export default new AgentAuthController()