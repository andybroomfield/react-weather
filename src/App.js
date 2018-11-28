import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class LocationForm extends Component {
	
	render() {
		return (
			<form className="location-form">
				<div className="form-input">
					<label for="location" className="sr-only">Location</label>
					<input type="text" name="location" className="form-text" placeholder="Search for a city"></input>
				</div>
				<div className="sr-only">
					<button>Search</button>
				</div>
			</form>
		);
	}
}

class LocationList extends Component {
	
	render() {
		return (
			<ul className="location-list">
				<li><a href="#">Location one</a></li>
				<li><a href="#">Location two</a></li>
				<li><a href="#">Location three</a></li>
			</ul>
		);
	}
}

class LocationSearch extends Component {
	
	render() {
		return (
			<div className="location-search">
				<LocationForm />
				<LocationList />
			</div>
		);
		
	}
}

class ForecastDetail extends Component {
	
	render() {
		return (
			<div className="forecast-detail">
				<h2 className="forecast-day">Today</h2>
				<img class="forecast-icon" src="./icons/weather-sun.svg" />
				<p class="forecast-text">Sunny</p>
				<p className="forecast-temp">30&deg;C</p>
			</div>
		);
	}
}

class ForecastDateSelect extends Component {
	
	render() {
		return (
			<ul className="forecast-date-select">
				<li><a href="#">M</a></li>
				<li><a href="#">T</a></li>
				<li><a href="#">W</a></li>
				<li><a href="#">T</a></li>
				<li><a href="#">F</a></li>
			</ul>
		);
	}
}

class Forecast extends Component {
	
	render() {
		return (
			<div className="forecast">
				<ForecastDetail />
				<ForecastDateSelect />
			</div>
		);
	}
}

class Weather extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeView: 'Forecast',
			woeid: 13911, // Brighton
			forecastResponse: null,
		};
		
	}
	
	getWeather() {
		fetch('https://www.metaweather.com/api/location/'+this.state.woeid+'/')
			.then(response => console.log(response))
	}
	
	render() {
		//this.getWeather();
		return (
			<div className="weather">
				<LocationSearch />
				<h2 className="location-name">Brighton</h2>
				<Forecast />
			</div>
		);
	}
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
					<h1>React Weather</h1>
        </header>
				<div className="App-body">
					<Weather />
				</div>
				<footer className="App-footer">
					<p>&copy; Andy Broomfield 2018</p>
					<p>Weather data from <a href="https://www.metaweather.com">metaweather.com</a></p>
				</footer>
      </div>
    );
  }
}

export default App;
