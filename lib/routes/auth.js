'use strict';

import { Router } from 'express';
import passport from 'passport';

import TokenService from './../service/token';

import errorHandler from '../middleware/errorHandler';

const routes = new Router();

routes.get('/google', passport.authenticate('google', {scope: ['profile']}))

routes.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/google' }), (req, res)=> {
    const data = {_id: req.user._id, provider: req.user.provider, isAgent: false}
    const token = "Bearer "+ TokenService.generate(data);
    res.json({name: req.user.name, pictureUrl: req.user.pictureUrl, token: token});
});

routes.use(errorHandler);

export default routes;