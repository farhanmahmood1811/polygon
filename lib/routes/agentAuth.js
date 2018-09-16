'use strict';

import { Router } from 'express';

import AgentAuthController from '../controller/agentAuth'
import errorHandler from '../middleware/errorHandler';
import Validator from '../middleware/validator/authAgent';

const routes = new Router();

routes.post('/register', Validator.register, AgentAuthController.register);
routes.post('/login', Validator.login, AgentAuthController.login);

routes.use(errorHandler);

export default routes;