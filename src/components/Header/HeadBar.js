import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { toggleSidebar } from '../../store/navigation/actionCreators';

export class HeadBar extends Component {
  handleClickSidebar = () => {
    this.props.toggleSidebar();
  };

  render() {
    return (
      <div className="headbar">
        <div className="headbar__icons">
          <span>
            <button type="button" onClick={this.handleClickSidebar}>
              <FontAwesomeIcon icon={faBars} />
            </button>
          </span>
        </div>
        <hr />
      </div>
    );
  }
}

export default connect(
  null,
  { toggleSidebar },
)(HeadBar);

HeadBar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};
