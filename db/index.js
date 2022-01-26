//Database Code Goes Here
const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/winfall';
mongoose.connect(mongoURI);


  const userSchema = new mongoose.Schema({
    // your code here
    username: {
      type: String,
      required: [true, 'Username is Required'],
      unique: true
    },
    totalWins: {
      type: Number
    },
    availWins: {
      type: Number
    },
    curStage: {
      type: Number
    },
    winMulti: {
      type: Number
    },
    multiCost: {
      type: Number
    },
    numGens: {
      type: Number
    },
    genCost: {
      type: Number
    },
    genSpeed: {
      type: Number
    },
    speedCost: {
      type: Number
    },
    genStorage: {
      type: Number
    },
    storageCost: {
      type: Number
    },
    victoryCost: {
      type: Number
    },
    numVictories: {
      type: Number
    },
    numRituals: {
      type: Number
    },
    ascended: {
      type: Boolean
    },
  });

  const User = mongoose.model('User', userSchema);

module.exports = User;