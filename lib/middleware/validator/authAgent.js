'use strict';

class AgentAuth {
    register = (req, res, next) => {
        let auth = {}
        if(!req.body.name) {
            return res.status(400).send("Name Required");
        } else if(!req.body.name.trim().length) {
            return res.status(400).send("Name Required");
        }
        auth.name = req.body.name.trim()

        if(!req.body.username) {
            return res.status(400).send("Username Required");
        } else if(!req.body.username.trim().length) {
            return res.status(400).send("Username Required");
        }
        auth.username = req.body.username.trim().toLowerCase()

        if(!req.body.password) {
            return res.status(400).send("Password Required");
        } else if(!req.body.password.trim().length) {
            return res.status(400).send("Password Required");
        }
        auth.password = req.body.password.trim()

        req.agentAuth = auth;
        next();
    }
    login = (req, res, next) => {
        let auth = {};
        if(!req.body.username) {
            return res.status(400).send("Username Required");
        } else if(!req.body.username.trim().length) {
            return res.status(400).send("Username Required");
        }
        auth.username = req.body.username.trim().toLowerCase();

        if(!req.body.password) {
            return res.status(400).send("Password Required");
        } else if(!req.body.password.trim().length) {
            return res.status(400).send("Password Required");
        }
        auth.password = req.body.password.trim();

        req.agentAuth = auth;

        next()
    }
}

export default new AgentAuth();