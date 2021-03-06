//Component in top left of added playfield.

// "When this button is clicked, wins become more powerful, increasing the amount of win energy created per win"

//Render current winMulti, multiCost, and a button to click

//On click, increase the winMulti by 1, remove multiCost wins from availWins, increase multiCost by *2

import React from "react";

class Level1 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.curStage < 1) {
      return( <div></div> );
    } else {
      return (
        <div className = "L1">
          <h3 className = "l1head">Increase Win Strength</h3>
          <div className="lev1a">Spend {this.props.multiCost}wins to increase wins earned.</div>
          <div className="lev1b">Current value per win: {this.props.winMulti}</div>
          <button className="l1button" onClick={this.props.buyMulti}>Buy</button>
          <div className="l1error">{this.props.multiError}</div>
        </div>
      )
    }
  }
}

export default Level1;