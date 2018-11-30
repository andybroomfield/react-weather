import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class LocationForm extends Component {
	
	constructor(props) {
		super(props);
		
		this.onSearchValueChange = this.onSearchValueChange.bind(this);
	}
	
	onSearchValueChange(event) {
		this.props.searchForLocations(event.target.value);
	}
	
	render() {
		return (
			<form className="location-form">
				<div className="form-input">
					<label htmlFor="location" className="sr-only">Location</label>
					<input autoFocus type="text" name="location" className="form-text" placeholder="Search for a city" onChange={this.onSearchValueChange}></input>
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
		const resultsMarkup = this.props.searchResults.map((row, index) => {
			return (
				<li key={index}>
					<a href={'#'+row.woeid} onClick={(e) => {
							e.preventDefault();
							this.props.changeCity(row.woeid)}
					}>{row.title}</a>
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

class LocationSearch extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			searchValue: '',
			searchResults: []
		};
		
		this.searchForLocations = this.searchForLocations.bind(this);
	}
	
	searchForLocations(query) {
		fetch('http://localhost/apiproxy/metaweather.php?method=location/search&query='+query)
			.then(response => response.json())
			.then(data => {
				this.setState({
					searchValue: query,
					searchResults: data.slice(0, 10)					
				});
			});
	}
	
	render() {
		return (
			<div className="location-search">
				<LocationForm searchForLocations={this.searchForLocations} />
				<LocationList searchResults={this.state.searchResults} changeCity={this.props.changeCity} />
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
	
	constructor(props) {
		super(props);
		this.state = {
			location: '---'
		};
	}
	
	getWeather() {
		fetch('http://localhost/apiproxy/metaweather.php?method=location/'+this.props.woeid)
			.then(response => response.json())
			.then(data => {
				console.log(data);
				this.setState({
						location: data.title
					});
				});
	}
	
	componentWillMount() {
		this.getWeather();
	}
	
	render() {
		return (
			<div className="forecast">
				<h2 className="location-name"><a href="#" onClick={this.props.onClick}>{this.state.location}</a></h2>
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
			activeView: 'LocationSearch',
			woeid: 13911, // Brighton
			forecastResponse: null,
		};
		
		this.changeViewFromClick = this.changeViewFromClick.bind(this);
		this.changeCity = this.changeCity.bind(this);
		
	}
	
	changeCity(woeid) {
		this.setState({
			activeView: 'Forecast',
			woeid: woeid
		});
	}
	
	changeViewFromClick(e) {
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
				<LocationSearch onClick={this.changeViewFromClick} changeCity={this.changeCity} />
			);
		} else if (this.state.activeView === 'Forecast') {
			return (
				<Forecast onClick={this.changeViewFromClick} woeid={this.state.woeid} />
			);
		}
	}
	
	render() {
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
