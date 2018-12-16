import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import LocationSearch from './components/LocationSearch/LocationSearch';
import Forecast from './components/Forecast/Forecast';

class App extends Component {

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
        <LocationSearch changeViewFromClick={this.changeViewFromClick} changeCity={this.changeCity} />
      );
    } else if (this.state.activeView === 'Forecast') {
      return (
        <Forecast changeViewFromClick={this.changeViewFromClick} woeid={this.state.woeid} />
      );
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>React Weather</h1>
        </header>
        <div className="App-body">
          {this.renderActiveView()}
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
