import React, { Component } from 'react';
import './ForecastDetail.css';

export default class ForecastDetail extends Component {

  getForecastDate() {
    // compare dates to either return today or the day name
    let todayDate = new Date();
    let forecastDate = new Date(this.props.weather.applicable_date);

    return todayDate.setHours(0,0,0,0) === forecastDate.setHours(0,0,0,0) ? 'Today' : forecastDate.toLocaleDateString('en-US', { weekday: 'long' });
  }

  getWeatherIcon() {
    // icon names to match with metaweather.com shortcodes
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

    // display icon in 'public' assets directory
    return './icons/weather-'+icons[this.props.weather.weather_state_abbr]+'.svg';
  }

  getWeatherStateName() {
    // if its a clear day and above 15deg C say it is 'Sunny' instead of 'Clear'
    if (this.props.weather.weather_state_name == 'Clear' && parseFloat(this.props.weather.the_temp) >= 15 ) {
      return 'Sunny';
    }
    return this.props.weather.weather_state_name;
  }

  render() {
    // short circuit if no weather to display, else render markup
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
