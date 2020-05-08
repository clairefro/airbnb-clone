import React, { Component } from 'react';
import "./priceMarker.css";

class Marker extends Component {
  render() {
    let classes = "marker";
    if (this.props.selected) {
      classes += " selected"
    }

    return (
      <div className={classes}>
        {`$${this.props.price}`}
      </div>
    );
  }
}

export default Marker;
