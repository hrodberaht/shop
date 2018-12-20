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
        <div>
          <span>Orders:</span>
          <select className="search__select" onChange={handleSelect}>
            <option value="all">All</option>
            <option value="realized">Realized</option>
            <option value="in-progress">In progress</option>
          </select>
        </div>
        <div className="search__id">
          <span>Id:</span>
          <input className="search__input" type="text" onChange={handleChange} />
        </div>
      </div>
    );
  }
}
