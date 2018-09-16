'use strict';

import { Router } from 'express';

import ListingController from '../controller/listing'
import errorHandler from '../middleware/errorHandler';
import TokenVerification from '../middleware/tokenVerification';
import Validator from '../middleware/validator/listing';

const routes = new Router();

routes.get('/', TokenVerification.user, Validator.find, ListingController.find);
routes.get('/:id', TokenVerification.user, ListingController.get);

routes.get('/my', TokenVerification.agent, ListingController.findByAgentId);
routes.post('/', TokenVerification.agent, Validator.create, ListingController.create);
routes.put('/:id', TokenVerification.agent, Validator.update, ListingController.update);
routes.delete('/:id', TokenVerification.agent, ListingController.remove)

routes.use(errorHandler);

export default routes;
