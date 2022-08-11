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

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => res.send('warum tuet me mir das ah'));

app.post('/create-checkout-session', createCheckoutSession);

app.post('/webhook', webhook);

