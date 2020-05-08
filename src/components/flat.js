import React, { Component } from 'react';
import './flat.css';

class Flat extends Component {
  selectFlat = () => {
    this.props.selectFlat(this.props.flat)
  }
  render() {
    const name = this.props.flat.name;
    const price = this.props.flat.price;
    const currency = this.props.flat.priceCurrency;

    const title = `${price}${currency} - ${name}`;

    const style = {
      backgroundImage: `url(${this.props.flat.imageUrl})`
    }
    return (
      <div
        className={`flat ${this.props.flat === this.props.selectedFlat ? 'selected' : ''}`}
        onClick={this.selectFlat}
      >
        <div className="flat-picture" style={style}></div>
        <div className="flat-title">
          {title}
        </div>
      </div>
    );
  }
}

export default Flat;
