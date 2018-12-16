import React, { Component } from 'react';
import './ForecastDateSelect.css';

export default class ForecastDateSelect extends Component {

  getShortDate(forecastDateStr) {
    const forecastDate = new Date(forecastDateStr);
    return forecastDate.toLocaleDateString('en-US', { weekday: 'narrow' });
  }

  render() {
    // short circuit return if we don't have weather data for multiple days
    if (!Array.isArray(this.props.allWeather)) {
      return null;
    }

    const dateSelectMarkup = this.props.allWeather.map((row, index) => {
      return (
        <li key={index}><a href={'#day'+index} onClick={(e) => {
          e.preventDefault();
          this.props.changeDay(index);
        }} className={index == this.props.selectedDay? 'active' : null}>{this.getShortDate(row.applicable_date)}</a></li>
      );
    });

    return (
      <ul className="forecast-date-select">
        {dateSelectMarkup}
      </ul>
    );
  }
}
