//Top Right Level component

//"Recruit additional SEIRs to generate wins on a regular basis. The Wins must flow"

//"You may have a maximum of genStorage SEIRS. Each SEIR generates winMulti wins every genSpeed seconds"

//Render current number of seirs (numGens) along with genCost and a button to buy more (up to genStorage)

//On click, increase the numGens by 1, remove genCost wins from availWins, increase genCost by *2

//if this is the first generator/seir being added, initalize auto-win function that generates winMulti*numGens wins every genSpeed secondds
import React from "react";

class Level2 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.curStage < 2) {
      return( <div></div> );
    } else {
      return (
        <div className = "L2">
          <h3>Hire SEIRs</h3>
          <div>Spend {this.props.genCost} to hire a SEIR.</div>
          <div>SEIRs generate {this.props.winMulti}wins every {this.props.genSpeed}seconds.</div>
          <div>Current number of SEIRs: {this.props.numGens} out of max {this.props.genStorage}.</div>
          <button onClick={this.props.buyGen}>Buy</button>
          <div className="error">{this.props.genError}</div>
        </div>
      )
    }
  }
}

export default Level2;