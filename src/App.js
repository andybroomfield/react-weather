import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class LocationForm extends Component {
	
	render() {
		return (
			<form className="location-form">
				<div className="form-input">
					<label htmlFor="location" className="sr-only">Location</label>
					<input autoFocus type="text" name="location" className="form-text" placeholder="Search for a city"></input>
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
	
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div className="location-search">
				<LocationForm />
				<LocationList />
				<button className="cancel-button" onClick={this.props.onClick}>Cancel</button>
			</div>
		);
		
	}
}

class ForecastDetail extends Component {
	
	render() {
		return (
			<div className="forecast-detail">
				<h2 className="forecast-day">Today</h2>
				<img className="forecast-icon" src="./icons/weather-sun.svg" />
				<p className="forecast-text">Sunny</p>
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
		
		this.changeViewFromClick = this.changeViewFromClick.bind(this);
		
	}
	
	getWeather() {
		fetch('https://www.metaweather.com/api/location/'+this.state.woeid+'/')
			.then(response => console.log(response))
	}
	
	changeViewFromClick(e) {
		console.log('click');
		e.preventDefault();
		this.toggleView();
	}
	
	toggleView() {
		const newView = this.state.activeView !== 'LocationSearch' ? 'LocationSearch' : 'Forecast';
		this.setState({activeView: newView});
	}
	
	renderActiveView() {
		if (this.state.activeView === 'LocationSearch') {
			return (
				<LocationSearch onClick={this.changeViewFromClick} />
			);
		} else if (this.state.activeView === 'Forecast') {
			return (
				<div className="forecast-wrapper">
					<h2 className="location-name"><a href="#" onClick={this.changeViewFromClick}>Brighton</a></h2>
					<Forecast />
				</div>
			);
		}
	}
	
	render() {
		//this.getWeather();
		return (
			<div className="weather">
				{this.renderActiveView()}
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
