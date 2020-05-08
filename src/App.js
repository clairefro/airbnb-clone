import React, { Component } from 'react';
import './App.css';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';

import Flat from './components/flat';
import PriceMarker from './components/priceMarker';


const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiY2xhaXJlZnJvZnJvIiwiYSI6ImNrMmc3YzdwdjBzOXEzaG9kY3hmdWJmbHgifQ.hvbyrZfZx7MxixCqThUrlA',
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFlats: [],
      flats: [],
      selectedFlat: null,
      search: ""
    };
  }

  componentDidMount() {
    fetch("https://raw.githubusercontent.com/clairefro/flats-boilerplate/master/flats.json")
    .then(response => response.json())
    .then((data) => {
      this.setState({
        allFlats: data,
        flats: data
      });
    });
  }

  selectFlat = (flat) => {
    this.setState({
      selectedFlat: flat
    });
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
      flats: this.state.allFlats.filter(flat => new RegExp(event.target.value, "i").exec(flat.name))
    });
  }

  render() {
    let center = [-73.6103642, 45.4972159]; // default center
    // set new center if flat selected
    if (this.state.selectedFlat) {
      center = [this.state.selectedFlat.lng, this.state.selectedFlat.lat]
    }

    return (
      <div className="app">
        <div className="main">
        <input
          className="search"
          type="text"
          placeholder="Search..."
          value={this.state.search}
          onChange={this.handleSearch}
        />
        <div className="flats">
          {this.state.flats.map(flat => (
            <Flat
              key={flat.id}
              flat={flat}
              selectFlat={this.selectFlat}
              selectedFlat={this.state.selectedFlat}
            />
          ))}
        </div>
        </div>
        <div className="map">
          <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: '100%',
              width: '100%'
            }}
            center={center}
            zoom={[12]}
          >
            {this.state.flats.map(flat => (
              <Marker
                key={flat.id}
                coordinates={[flat.lng, flat.lat]}
              >
                <PriceMarker
                  price={flat.price}
                  selected={flat === this.state.selectedFlat}
                />
              </Marker>
            ))}
          </Map>
        </div>
      </div>
    );
  }
}

export default App;
