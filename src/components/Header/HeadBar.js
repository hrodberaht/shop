import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default class HeadBar extends Component {
  render() {
    return (
      <div className="headbar">
        <div className="headbar__icons">
          <span>
            <FontAwesomeIcon icon={faBars} />
          </span>
        </div>
        <hr />
      </div>
    );
  }
}
