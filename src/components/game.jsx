//Intital game environment goes here.
import React from "react";
import axios from "axios";

import Level1 from "./level1.jsx";
import Level2 from "./level2.jsx";
// import Level3 from "./level3.jsx";
// import Level4 from "./level4.jsx";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      entryError: '',
      multiError: '',
      username: '',
      totalWins: 0,
      availWins: 0,
      curStage: 0,
      winMulti: 1,
      multiCost: 25,
      numGens: 0,
      genCost: 50,
      genSpeed: 10,
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
      multiCost *= 2;
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
      this.setState({multiError});
    } else if (numGens === genStorage) {
      genError = 'Maxiumum Number of SEIRs Reached'
    } else{
      availWins -= genCost;
      genCost *= 2;
      numGens += 1;
      genError = '';
      this.setState({availWins, genCost, numGens, genError});
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

  componentDidUpdate() {
    if (this.state.totalWins > 19 && this.state.curStage < 1) {
      this.setState({curStage: 1});
    }
    if (this.state.totalWins > 59 && this.state.curStage < 2) {
      this.setState({curStage: 2});
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
          <button onClick={this.onSubmit}>Login</button>
        </div>
      )
    } else {
      return (
        <div>
          <h1>WINFALL ~~~ Total Wins: {this.state.totalWins} ~~~ Available Wins: {this.state.availWins} ~~~ User: {this.state.username}</h1>
          <button onClick={this.win}>GENERATE WIN</button>
          <div className="playField">
            <Level1 buyMulti={this.buyMulti} multiCost={this.state.multiCost} multiError={this.state.multiError} winMulti={this.state.winMulti} curStage={this.state.curStage}></Level1>
            <Level2 buyGen={this.buyGen} genCost={this.state.genCost} genError={this.state.genError} numGens={this.state.numGens}
              curStage={this.state.curStage} genSpeed={this.state.genSpeed} winMulti={this.state.winMulti} genStorage={this.state.genStorage} ></Level2>
            {/* <Level2></Level2>
            <Level3></Level3>
            <Level4></Level4> */}
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