import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class OrdersSearch extends Component {
  static propTypes = {
    handleSelect: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
  };

  render() {
    const { handleSelect, handleChange } = this.props;
    return (
      <div className="search">
        <div className="-select">
          <span>Orders:</span>
          <select onChange={handleSelect}>
            <option value="all">All</option>
            <option value="realized">Realized</option>
            <option value="in-progress">In progress</option>
          </select>
        </div>
        <div className="-input">
          <span>Id:</span>
          <input type="text" onChange={handleChange} />
        </div>
      </div>
    );
  }
}
