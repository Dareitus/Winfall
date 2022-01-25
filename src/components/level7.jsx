import React from "react";

class Level7 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.curStage < 7) {
      return( <div></div> );
    } else {
      return (
        <div className="L7">
          <h3 className="l7head">THERE IS NO BUTTON</h3>
          <div className="lev7a">The button is an illusion. The ritual is all that matters.</div>
          <div className="lev7b">You have summoned {this.props.numRituals} of the dark gods.</div>
          <div className="lev7c">They bestow gifts. Summon More. You need.... 3... You know... You feel...</div>
          <button className="l7button">PRESS ANYWAY</button>
        </div>
      )
    }
  }
}

export default Level7;