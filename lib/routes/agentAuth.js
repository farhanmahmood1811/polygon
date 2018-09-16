'use strict';

import { Router } from 'express';

import AgentAuthController from '../controller/agentAuth'
import errorHandler from '../middleware/errorHandler';

const routes = new Router();

routes.post('/register', AgentAuthController.register);
routes.post('/login', AgentAuthController.login);

routes.use(errorHandler);

export default routes;