// Server Code Goes Here

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname + '/../dist'));

//test route
app.get('/test', (req, res) => {
  res.send('Server Says Hello!');
});

//get user route
app.get('/user', (req, res) => {
  //check db for record at req.param.username
  //if record exists, return record
  //if no record, create record from base state, then return record
});

app.post('/user', (req, res) => {
  //take req and update database with new player state
});

app.listen(port, () => {
  console.log(`Server is now running at port: ${port}`);
});