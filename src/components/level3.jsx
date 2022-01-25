//bottom left component

//"SEIRS are learning while they teach. Increase win generation rate"

//Render current genSpeed and speedCost with a button

//On click, decrease the genSpeed by .1, remove speedCost wins from availWins, increase speedCost by *2
import React from "react";
class Level3 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.curStage < 3) {
      return( <div></div> );
    } else {
      return (
        <div className="L3">
          <h3 className="l3head">Improve SEIRs</h3>
          <div className="lev3a">Spend {this.props.speedCost} to improve SEIR speed by 20%.</div>
          <div className="lev3b">SEIRs currently generate wins every {this.props.genSpeed}seconds.</div>
          <button className="l3button" onClick={this.props.buySpeed}>Buy</button>
          <div className="l3error">{this.props.speedError}</div>
        </div>
      )
    }
  }
}

export default Level3;