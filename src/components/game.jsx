//Intital game environment goes here.
import React from "react";
import axios from "axios";

// import Level1 from "./level1.jsx";
// import Level2 from "./level2.jsx";
// import Level3 from "./level3.jsx";
// import Level4 from "./level4.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      entryError: '',
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
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  onSubmit() {
    let hasError = false;
    if (this.state.username = '') {
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
    console.log('You Pushed Win');
  }

  render() {
    if (!loggedIn) {
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
          <div>GAME GOES HERE</div>
          <button onClick={this.win}>GENERATE WIN</button>
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