// Server Code Goes Here

const express = require('express');
const app = express();
const port = 3000;
const User = require('../db');

app.use(express.json());
app.use(express.static(__dirname + '/../dist'));


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
    let data = await User.findOne({username: username}).exec();
    if (data === null) {
      data = await User.create({
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
    return data;
  } catch (err) {
    return err;
  }
}

app.post('/user', async (req, res) => {
  try {
    let save = req.body;
    const data = await saveUser(save);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

const saveUser = async (save) => {
  try {
    //Database code goes here - check for existing user, create if new
    let filter = {username: save.username};
    let data = await User.findOneAndUpdate(filter, save, {bew: true});
    return data;
  } catch (err) {
    return err;
  }
}

app.listen(port, () => {
  console.log(`Server is now running at port: ${port}`);
});