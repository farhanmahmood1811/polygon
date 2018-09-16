'use strict';

import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import passport from 'passport';

import ListingRoutes from './routes/listing';
import BookingRoutes from './routes/booking';
import AgentAuthRoutes from './routes/agentAuth';
import AuthRoutes from './routes/auth';
import Config from './core/config';
import ConnectToDb from './core/connect'

ConnectToDb();

const app = express();
const GoogleAuthSetup = require('./controller/googleLogin');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Helmet helps you secure your Express apps by setting various HTTP headers
// https://github.com/helmetjs/helmet
app.use(helmet());

// Enable CORS with various options
// https://github.com/expressjs/cors
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(`${__dirname}/public`));

app.use(require('express-session')({ secret: 's3cr3t', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', AuthRoutes);
app.use('/agent/auth', AgentAuthRoutes);
app.use('/listing', ListingRoutes);
app.use('/booking', BookingRoutes);

app.listen(Config.port, () => {
  console.log(`Access api on url localhost:${Config.port}/`);
});
  
export default app;