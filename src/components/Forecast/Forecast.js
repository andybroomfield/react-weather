import React, { Component } from 'react';
import './Forecast.css';
import ForecastDetail from './ForecastDetail/ForecastDetail';
import ForecastDateSelect from './ForecastDateSelect/ForecastDateSelect';

export default class Forecast extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: '---',
      weather: [],
      day: 0
    };

    // Bind changeDay to this class as passed down to ForecastDateSelect as property
    this.changeDay = this.changeDay.bind(this);
  }

  changeDay(newDay) {
    if (typeof(this.state.weather[newDay]) !== 'undefined') {
      this.setState({day: newDay});
    }
  }

  getWeather() {
    // do API call and add respone to weather state
    fetch('https://api-proxy.newmediathinking.com/metaweather.php?method=location/'+this.props.woeid)
      .then(response => response.json())
      .then(data => {
        this.setState({
            location: data.title,
            weather: data.consolidated_weather
          });
        });
  }

  componentWillMount() {
    // make API request onece component is loaded
    this.getWeather();
  }

  render() {
    // get selected days weather
    const displayWeather = this.state.weather[this.state.day];

    return (
      <div className="forecast">
        <h2 className="location-name"><a href="#" onClick={this.props.changeViewFromClick}>{this.state.location}</a></h2>
        <ForecastDetail weather={displayWeather} />
        <ForecastDateSelect allWeather={this.state.weather} selectedDay={this.state.day} changeDay={this.changeDay} />
      </div>
    );
  }
}
