import React, { Component } from 'react';

import './LocationList.css';

export default class LocationList extends Component {

  render() {
    const resultsMarkup = this.props.searchResults.map((row, index) => {
      return (
        <li key={index}>
          <a href={'#'+row.woeid} onClick={(e) => {
            e.preventDefault();
            this.props.changeCity(row.woeid)
          }} className={index == this.props.chosenResult? 'active' : null}>{row.title}</a>
        </li>
      );
    });

    return (
      <ul className="location-list">
        {resultsMarkup}
      </ul>
    );
  }
}
