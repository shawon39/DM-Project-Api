const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const Pool = require('pg').Pool;

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const createMeeting = require('./controllers/createMeeting');
const currentMeeting = require('./controllers/currentMeeting');
const previousMeeting = require('./controllers/previousMeeting');
const dashboard  = require('./controllers/dashboard');

const client = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'dmDB',
  password: 'sh563486',
  port: 5432,
})
client.connect();

const app = express();
app.use(bodyParser.json());

app.post('/signin', (req, res) => { signin.handleSignin(req, res, client, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, client, bcrypt) })
app.post('/createMeeting', (req, res) => { createMeeting.handleCreateMeeting(req, res, client) })
app.get('/currentMeeting', (req, res) => { currentMeeting.handleCurrentMeeting(req, res, client) })
app.get('/previousMeeting', (req, res) => { previousMeeting.handlePreviousMeeting(req, res, client) })
app.get('/dashboard', (req, res) => { dashboard.handleDashboard(req, res, client) })

app.listen(3000, () => {
  console.log('app is running on port on 3000');
})