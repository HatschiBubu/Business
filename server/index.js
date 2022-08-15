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

app.options('/', cors()) // enable pre-flight request for DELETE request
app.options('/create-checkout-session', cors())

app.delete('/', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.delete('/create-checkout-session', cors(), function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  })

app.get('/', (req, res) => res.send('warum tuet me mir das ah2'));

app.post('/create-checkout-session', createCheckoutSession);

app.post('/webhook', webhook);

