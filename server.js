const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const Pool = require('pg').Pool

const register = require('./controllers/register');
const signin = require('./controllers/signin');

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


app.post('/signin', signin.handleSignin(client, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, client, bcrypt) })

app.listen(3000, () => {
  console.log('app is running on port on 3000');
})