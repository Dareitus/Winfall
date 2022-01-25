import React from "react";

class Level6 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.curStage < 6) {
      return( <div></div> );
    } else {
      return (
        <div className="L6">
          <h3 className="l6head">PeRFor'M t3h DARK r!tuAl</h3>
          <div className="lev6a">Spend 3 Victories and Sacrifice 25 SEIRS. ~They'll Be Fine~</div>
          <div className="lev6b">The Ritual Must Be Performed. You Will Press The Button.</div>
          <div className="lev6c">Endless victories from beyond call out to you. Embrace us.</div>
          <button className="l6button" onClick={this.props.buyRitual}>SACRIFICE</button>
          <div className="l6error">{this.props.ritualError}</div>
        </div>
      )
    }
  }
}

export default Level6;