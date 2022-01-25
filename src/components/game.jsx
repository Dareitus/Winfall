//Intital game environment goes here.
import React from "react";
import axios from "axios";

import Level1 from "./level1.jsx";
import Level2 from "./level2.jsx";
import Level3 from "./level3.jsx";
import Level4 from "./level4.jsx";
import Level5 from "./level5.jsx";
import Level6 from "./level6.jsx";
import Level7 from "./level7.jsx";
import Level8 from "./level8.jsx";
let genInterval;
let vicInterval;
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      entryError: '',
      multiError: '',
      speedError: '',
      storageError: '',
      victoryError: '',
      ritualError: '',
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
      genStorage: 5,
      storageCost: 500,
      victoryCost: 10000,
      numVictories: 0,
      numRituals: 0,
      ascended: false,
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
    this.buyVictory = this.buyVictory.bind(this);
    this.buyRitual = this.buyRitual.bind(this);
    this.generateVictories = this.generateVictories.bind(this);
    this.ascend = this.ascend.bind(this);
  }

  ascend() {
    this.setState({ascended:true});
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
      multiCost *= 1.5;
      multiCost = Math.round(multiCost);
      if(winMulti === 1){
        winMulti++;
      } else {
        winMulti *= 1.3;
        winMulti = Math.round(winMulti);
      }
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
      genCost *= 1.2;
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
      speedCost *= 1.4;
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
      storageCost *= 1.8;
      storageCost = Math.round(storageCost);
      genStorage += 5;
      storageError = '';
      this.setState({availWins, storageCost, genStorage, storageError});
    }
  }

  buyVictory() {
    let availWins = this.state.availWins;
    let victoryCost = this.state.victoryCost;
    let numVictories = this.state.numVictories;
    let victoryError = this.state.victoryError;
    if (availWins < victoryCost) {
      victoryError = 'You do not have enough Win Energy';
      this.setState({victoryError});
    } else {
      availWins -= victoryCost;
      numVictories++;
      victoryError = '';
      this.setState({availWins, victoryCost, numVictories, victoryError});
    }
  }

  buyRitual() {
    let numRituals = this.state.numRituals;
    let numVictories = this.state.numVictories;
    let numGens = this.state.numGens;
    let ritualError = this.state.ritualError;
    let genCost = this.state.genCost;
    if (numVictories < 3 && numGens < 25) {
      ritualError = 'You are not prepared for the ritual.'
      this.setState({ritualError});
    } else if (numVictories < 3) {
      ritualError = 'You need more energy for the ritual.'
      this.setState({ritualError});
    } else if (numGens < 25) {
      ritualError = 'The ritual requires more sacrifices.'
      this.setState({ritualError});
    } else {
      numGens -=25;
      numVictories -=3;
      numRituals++;
      ritualError = '';
      genCost = 50;
      this.setState({numGens, genCost, ritualError, numRituals, numVictories})
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

  generateVictories() {
    let numRituals = this.state.numRituals;
    if (numRituals > 0) {
      let availWins = this.state.availWins;
      let totalWins = this.state.totalWins;
      let numVictories = this.state.numVictories;
      totalWins += (numRituals*25000);
      availWins += (numRituals*25000);
      numVictories++;
      this.setState({totalWins, availWins, numVictories});
    }
  }

  componentDidMount() {
    genInterval = setInterval(this.generateWins, (this.state.genSpeed * 1000));
    vicInterval = setInterval(this.generateVictories, 10000);
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
    if (this.state.totalWins > 7500 && this.state.curStage < 5) {
      this.setState({curStage: 5});
    }
    if (this.state.numVictories > 1 && this.state.curStage < 6) {
      this.setState({curStage: 6});
    }
    if (this.state.numRituals > 0 && this.state.curStage < 7) {
      this.setState({curStage: 7});
    }
    if (this.state.numRituals > 2 && this.state.curStage < 8) {
      this.setState({curStage: 8});
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
    } else if (!this.state.ascended) {
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
            <Level5 buyVictory={this.buyVictory} victoryCost={this.state.victoryCost} victoryError={this.state.victoryError}
              curStage={this.state.curStage} numVictories={this.state.numVictories} ></Level5>
            <Level6 buyRitual={this.buyRitual} ritualError={this.state.ritualError}
              curStage={this.state.curStage} numVictories={this.state.numRituals} ></Level6>
            <Level7 curStage={this.state.curStage} numRituals={this.state.numRituals} ></Level7>
            <Level8 curStage={this.state.curStage} ascend={this.ascend}></Level8>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h1 className="header">{this.state.username} has ascended.</h1>
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