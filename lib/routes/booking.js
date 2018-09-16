'use strict';

import { Router } from 'express';

import BookingController from './../controller/booking'
import errorHandler from '../middleware/errorHandler';
import TokenVerification from '../middleware/tokenVerification';
import Validator from '../middleware/validator/booking';

const routes = new Router();

routes.post('/', TokenVerification.user, Validator.create, BookingController.create);

routes.get('/see', TokenVerification.agent, BookingController.findByAgentId);

routes.use(errorHandler);

export default routes;
