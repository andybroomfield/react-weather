import React, { Component } from 'react';
import './ForecastDetail.css';

export default class ForecastDetail extends Component {

  getForecastDate() {
    let todayDate = new Date();
    let forecastDate = new Date(this.props.weather.applicable_date);

    return todayDate.setHours(0,0,0,0) === forecastDate.setHours(0,0,0,0) ? 'Today' : forecastDate.toLocaleDateString('en-US', { weekday: 'long' });
  }

  getWeatherIcon() {
    const icons = {
      sn: 'snow',
      sl: 'snow',
      h: 'hail',
      t: 'lightning',
      hr: 'rain',
      lr: 'drizzle',
      s: 'rain',
      hc: 'fog',
      lc: 'cloud',
      c: 'sun'
    }

    return './icons/weather-'+icons[this.props.weather.weather_state_abbr]+'.svg';
  }

  getWeatherStateName() {
    if (this.props.weather.weather_state_name == 'Clear' && parseFloat(this.props.weather.the_temp) >= 15 ) {
      return 'Sunny';
    }
    return this.props.weather.weather_state_name;
  }

  render() {

    if (typeof(this.props.weather) === 'undefined') {
      return null;
    } else {
      return (
        <div className="forecast-detail">
          <h2 className="forecast-day">{this.getForecastDate()}</h2>
          <img className="forecast-icon" src={this.getWeatherIcon()} />
          <p className="forecast-text">{this.getWeatherStateName()}</p>
          <p className="forecast-temp">{parseFloat(this.props.weather.the_temp).toFixed(1)}&deg;C</p>
        </div>
      );
    }
  }
}
