const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './.env' });
const createCheckoutSession = require('./api//checkout');
const webhook = require('./api/webhook');

const app = express();
const port = 8080;
const server = app.listen(port, () => console.log('server listening on port', port));

server.keepAliveTimeout = 65000;
server.headersTimeout = 70000;

app.use(express.json({
    verify: (req, res, buffer) => req['rawBody'] = buffer,
}));

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.get('/', (req, res) => res.send('Hello World'));

app.post('/create-checkout-session', createCheckoutSession);

app.post('/webhook', webhook);

