import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class OrdersSearch extends Component {
  static propTypes = {
    handleCheck: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  };

  render() {
    const { handleCheck, title } = this.props;
    return (
      <div>
        {title}
        <input type="checkbox" onClick={handleCheck} />
      </div>
    );
  }
}
