import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class OrdersSearch extends Component {
  static propTypes = {
    handleSelect: PropTypes.func.isRequired,
  };

  render() {
    const { handleSelect } = this.props;
    return (
      <div>
        {'Orders: '}
        <select onChange={handleSelect}>
          <option value="all">All</option>
          <option value="realized">Realized</option>
          <option value="in-progress">In progress</option>
        </select>
      </div>
    );
  }
}
