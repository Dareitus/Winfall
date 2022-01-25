//Intital game environment goes here.
import React from "react";
import axios from "axios";

import Level1 from "./level1.jsx";
import Level2 from "./level2.jsx";
import Level3 from "./level3.jsx";
import Level4 from "./level4.jsx";
let genInterval;
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      entryError: '',
      multiError: '',
      speedError: '',
      storageError: '',
      username: '',
      totalWins: 0,
      availWins: 0,
      curStage: 0,
      winMulti: 1,
      multiCost: 10,
      numGens: 0,
      genCost: 50,
      genSpeed: 2,
      speedCost: 150,
      genStorage: 3,
      storageCost: 500
    };
    //binds go here
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.win = this.win.bind(this);
    this.buyMulti = this.buyMulti.bind(this);
    this.buyGen = this.buyGen.bind(this);
    this.generateWins = this.generateWins.bind(this);
    this.buySpeed = this.buySpeed.bind(this);
    this.buyStorage = this.buyStorage.bind(this);
  }

  buyMulti() {
    let availWins = this.state.availWins;
    let multiCost = this.state.multiCost;
    let winMulti = this.state.winMulti;
    let multiError = this.state.multiError;
    if (availWins < multiCost) {
      multiError = 'You do not have enough Win Energy';
      this.setState({multiError});
    } else {
      availWins -= multiCost;
      multiCost *= 1.2;
      multiCost = Math.round(multiCost);
      winMulti += 1;
      multiError = '';
      this.setState({availWins, multiCost, winMulti, multiError});
    }
  }

  buyGen() {
    let availWins = this.state.availWins;
    let genCost = this.state.genCost;
    let numGens = this.state.numGens;
    let genError = this.state.genError;
    let genStorage = this.state.genStorage;
    if (availWins < genCost) {
      genError = 'You do not have enough Win Energy';
      this.setState({genError});
    } else if (numGens === genStorage) {
      genError = 'Maxiumum Number of SEIRs Reached'
      this.setState({genError});
    } else{
      availWins -= genCost;
      genCost *= 1.4;
      genCost = Math.round(genCost);
      numGens += 1;
      genError = '';
      this.setState({availWins, genCost, numGens, genError});
    }
  }

  buySpeed() {
    let availWins = this.state.availWins;
    let speedCost = this.state.speedCost;
    let genSpeed = this.state.genSpeed;
    let speedError = this.state.speedError;
    if (availWins < speedCost) {
      speedError = 'You do not have enough Win Energy';
      this.setState({speedError});
    } else {
      availWins -= speedCost;
      speedCost *= 1.6;
      speedCost = Math.round(speedCost);
      genSpeed *= 0.8;
      genSpeed = Math.round(genSpeed * 1000) / 1000;
      speedError = '';
      this.setState({availWins, speedCost, genSpeed, speedError});
    }
  }

  buyStorage() {
    let availWins = this.state.availWins;
    let storageCost = this.state.storageCost;
    let genStorage = this.state.genStorage;
    let storageError = this.state.storageError;
    if (availWins < storageCost) {
      storageError = 'You do not have enough Win Energy';
      this.setState({storageError});
    } else {
      availWins -= storageCost;
      storageCost *= 2;
      genStorage += 3;
      storageError = '';
      this.setState({availWins, storageCost, genStorage, storageError});
    }
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  onSubmit() {
    let hasError = false;
    if (this.state.username === '') {
      this.setState({ entryError: 'Please Provide Username' });
      hasError = true;
    } else if (this.state.username.length > 20) {
      this.setState({ entryError: 'Username must be less than 20 Characters' });
      hasError = true;
    } else {
      this.setState({ entryError: ''});
    }
    if (!hasError) {
      let username = this.state.username;
      this.login(username);
    }
  }

  login(username) {
    axios.get('/user', {params:{username}})
      .then((res) => {
        console.log('Success Fetching User', res.body);
        this.setState({ loggedIn: true});
      })
      .catch((err) => {
        console.log('Error Fetching User Data', err);
      });
  }

  win() {
    let totalWins = this.state.totalWins;
    let availWins = this.state.availWins;
    let winMulti = this.state.winMulti;
    totalWins += winMulti;
    availWins += winMulti;
    this.setState({totalWins, availWins});
  }

  generateWins() {
    let numGens = this.state.numGens;
    if (numGens > 0) {
      let availWins = this.state.availWins;
      let totalWins = this.state.totalWins;
      let winMulti = this.state.winMulti;
      totalWins += (winMulti * numGens);
      availWins += (winMulti * numGens);
      this.setState({totalWins, availWins});
    }
  }

  componentDidMount() {
    genInterval = setInterval(this.generateWins, (this.state.genSpeed * 1000));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.totalWins > 19 && this.state.curStage < 1) {
      this.setState({curStage: 1});
    }
    if (this.state.totalWins > 59 && this.state.curStage < 2) {
      this.setState({curStage: 2});
    }
    if (this.state.totalWins > 149 && this.state.curStage < 3) {
      this.setState({curStage: 3});
    }
    if (this.state.totalWins > 500 && this.state.curStage < 4) {
      this.setState({curStage: 4});
    }
    if (this.state.genSpeed !== prevState.genSpeed) {
      clearInterval(genInterval);
      genInterval = setInterval(this.generateWins, (this.state.genSpeed * 1000));
    }
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <div>
          <div>Enter your name to begin/resume play.</div>
          <label>Username: </label>
          <div className="error">{this.state.entryError}</div>
          <input type="text" id="username" onChange={this.onChange}></input>
          <button className="button" onClick={this.onSubmit}>Login</button>
        </div>
      )
    } else {
      return (
        <div>
          <div className="playField">
          <h1 className="header">WINFALL ~~~ Total Wins: {this.state.totalWins} ~~~ Available Wins: {this.state.availWins} ~~~ User: {this.state.username}</h1>
          <button className="buttonMain" onClick={this.win}>GENERATE WIN</button>
            <Level1 buyMulti={this.buyMulti} multiCost={this.state.multiCost} multiError={this.state.multiError}
              winMulti={this.state.winMulti} curStage={this.state.curStage}></Level1>
            <Level2 buyGen={this.buyGen} genCost={this.state.genCost} genError={this.state.genError} numGens={this.state.numGens}
              curStage={this.state.curStage} genSpeed={this.state.genSpeed} winMulti={this.state.winMulti} genStorage={this.state.genStorage} ></Level2>
            <Level3 buySpeed={this.buySpeed} speedCost={this.state.speedCost} speedError={this.state.speedError}
              curStage={this.state.curStage} genSpeed={this.state.genSpeed} ></Level3>
            <Level4 buyStorage={this.buyStorage} storageCost={this.state.storageCost} storageError={this.state.storageError}
              curStage={this.state.curStage} genStorage={this.state.genStorage} ></Level4>
          </div>
        </div>
      )
    }
  }
}

export default Game;
//Ask for username, if exists, pull data from DB and update state using records
//If username does not exist in DB, create new entry with following stats:
//Initailize State

//then update the state with these base stats

//Render Header - WINFALL - TotalWins: x TimePlayed: HH:MM Username: Name

//Render Button that when clicked adds winMulti wins to totalWins and availWins
//Render Available wins under button

//Render level 1 if totalWins is above 20
//Render level 2 if totalWins is above 60
//Render Level 3 if totalWins is above 150
//Render Level 4 if totalWins is above 300

//Render message with Save button at bottom of screen. On click of save, save state to DB