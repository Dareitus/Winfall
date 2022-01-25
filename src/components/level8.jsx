import React from "react";

class Level8 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.curStage < 8) {
      return( <div></div> );
    } else {
      return (
        <div className="L8">
          <button className="l8button" onClick={this.props.ascend}>ASCEND</button>
        </div>
      )
    }
  }
}

export default Level8;