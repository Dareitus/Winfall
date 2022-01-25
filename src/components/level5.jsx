import React from "react";
class Level5 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.curStage < 5) {
      return( <div></div> );
    } else {
      return (
        <div className="L5">
          <h3 className="l5head">Claim A Victory</h3>
          <div className="lev5a">Spend {this.props.victoryCost}wins to claim a victory.</div>
          <div className="lev5b">Victories Claimed: {this.props.numVictories}.</div>
          <button className="l5button" onClick={this.props.buyVictory}>Buy</button>
          <div className="l5error">{this.props.victoryError}</div>
        </div>
      )
    }
  }
}

export default Level5;