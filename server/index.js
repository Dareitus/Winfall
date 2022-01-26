// Server Code Goes Here

const express = require('express');
const app = express();
const port = 3000;
const User = require('../db/User');

app.use(express.json());
app.use(express.static(__dirname + '/../dist'));


//get user route
app.get('/user', async (req, res) => {
  try {
    console.log('0');
    const username = req.query.username;
    const data = await getUser(username);
    console.log('3', data);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

const getUser = async (username) => {
  try {
    //Database code goes here - check for existing user, create if new
    //const data = await User.findOne({username: username}).exec();
    const data = null;
    console.log('1');
    if (data === null) {
      data = await User.insertMany({
        username: username,
        totalWins: 0,
        availWins: 0,
        curStage: 0,
        winMulti: 1,
        multiCost: 10,
        numGens: 0,
        genCost: 50,
        genSpeed: 2,
        speedCost: 150,
        genStorage: 5,
        storageCost: 500,
        victoryCost: 10000,
        numVictories: 0,
        numRituals: 0,
        ascended: false,
      });
    }
    console.log('2');
    return data;
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