import React, { Component } from 'react';
import './LocationForm.css';

export default class LocationForm extends Component {

  constructor(props) {
    super(props);

    // bind this in onSearchValueChange to class as used on change event
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
          <input type="text" name="location" className="form-text" placeholder="Search for a city" onChange={this.onSearchValueChange}></input>
        </div>
      </form>
    );
  }
}
