import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { toggleSidebar } from '../../store/navigation/actionCreators';
import getNavigationSidebarValue from '../../store/navigation/selectors';

export class HeadBar extends Component {
  render() {
    const { navValue, toggle } = this.props;
    return (
      <div className="headbar">
        <div className="headbar__icons">
          <button type="button" onClick={toggle}>
            {navValue && (
              <FontAwesomeIcon
                className="menu-arrow"
                icon={faAngleLeft}
              />
            )}
            <FontAwesomeIcon icon={faBars} />
            {!navValue && (
              <FontAwesomeIcon
                className="menu-arrow"
                icon={faAngleRight}
              />
            )}
          </button>
        </div>
        <hr />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  navValue: getNavigationSidebarValue(state),
});

export default connect(
  mapStateToProps,
  { toggle: toggleSidebar },
)(HeadBar);

HeadBar.propTypes = {
  toggle: PropTypes.func.isRequired,
  navValue: PropTypes.bool.isRequired,
};
