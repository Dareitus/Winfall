//Bottom right component

//Generator Storage, buy more storage in chunks of 3.
import React from "react";
class Level4 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.curStage < 4) {
      return( <div></div> );
    } else {
      return (
        <div className="L4">
          <h3 className="l4head">Expand to more Cohorts</h3>
          <div className="lev4a">Spend {this.props.storageCost} increase max SEIR count by 5.</div>
          <div className="lev4b">Current maximum SEIRs: {this.props.genStorage}.</div>
          <button className="l4button" onClick={this.props.buyStorage}>Buy</button>
          <div className="l4error">{this.props.storageError}</div>
        </div>
      )
    }
  }
}

export default Level4;