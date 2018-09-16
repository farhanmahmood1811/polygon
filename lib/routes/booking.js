'use strict';

import { Router } from 'express';

import BookingController from './../controller/booking'
import errorHandler from '../middleware/errorHandler';
import TokenVerification from '../middleware/tokenVerification';

const routes = new Router();

routes.get('/see', TokenVerification.agent, BookingController.findByAgentId);
routes.post('/', TokenVerification.user, BookingController.create);

routes.use(errorHandler);

export default routes;
