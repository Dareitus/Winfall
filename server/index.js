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
app.get('/user', async (req, res) => {
  try {
    const username = req.query.username;
    const data = await getUser(username);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

const getUser = async (username) => {
  try {
    //Database code goes here - check for existing user, create if new
  } catch (err) {
    return err;
  }
}

app.post('/user', (req, res) => {
  //take req and update database with new player state
});

app.listen(port, () => {
  console.log(`Server is now running at port: ${port}`);
});