import React, { Component } from 'react';
import './LocationSearch.css';

import LocationForm from './LocationForm/LocationForm';
import LocationList from './LocationList/LocationList';

export default class LocationSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      searchResults: [],
      chosenResult: -1
    };

    this.searchForLocations = this.searchForLocations.bind(this);
  }

  searchForLocations(query) {
    fetch('https://api-proxy.newmediathinking.com/metaweather.php?method=location/search&query='+encodeURI(query))
      .then(response => response.json())
      .then(data => {
        this.setState({
          searchValue: query,
          searchResults: data.slice(0, 10),
          chosenResult: -1
        });
      });
  }

  handleKeyDownArrow() {
    const chosenResult = parseInt(this.state.chosenResult);
    if (!isNaN(chosenResult) && chosenResult < this.state.searchResults.length - 1) {
      this.setState({chosenResult: chosenResult + 1});
    }
  }

  handleKeyUpArrow() {
    const chosenResult = parseInt(this.state.chosenResult);
    if (!isNaN(chosenResult) && chosenResult > -1) {
      this.setState({chosenResult: chosenResult - 1});
    }
  }

  handleEnterKey() {
    const chosenResult = parseInt(this.state.chosenResult);
    if (!isNaN(chosenResult) && typeof(this.state.searchResults[chosenResult].woeid) !== 'undefined') {
      this.props.changeCity(this.state.searchResults[chosenResult].woeid);
    }
  }

  render() {

    return (
      <div className="location-search" onKeyDown={(e) => {
          if (e.keyCode !== 13 && e.keyCode !== 38 && e.keyCode !== 40) {
            return;
          }
          e.preventDefault();
          if (e.keyCode === 13){
            // Enter
            this.handleEnterKey();
          } else if (e.keyCode === 38) {
            // Up Arrow
            this.handleKeyUpArrow();
          } else if (e.keyCode === 40) {
            // Down Arrow
            this.handleKeyDownArrow();
          }
        }}>
        <LocationForm searchForLocations={this.searchForLocations} ref="locationForm" />
        <LocationList searchResults={this.state.searchResults} changeCity={this.props.changeCity} chosenResult={this.state.chosenResult} ref="locationList" />
        { // display cancel button only if existing city selected
          this.props.woeid !== null ?
          <button className="cancel-button" onClick={this.props.changeViewFromClick}>Cancel</button>
          : null
        }
      </div>
    );

  }
}
