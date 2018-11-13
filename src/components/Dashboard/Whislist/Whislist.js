import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchWhislist, removeProductWhisList } from '../../../store/whislist/actionCerator';
import { getAuthToken, getAuthUserId } from '../../../store/auth/selectors';
import { getWhislistLoaded, getWhislistProducts } from '../../../store/whislist/selectors';
import ProductInWhislist from './ProductInWhislist';

export class Whislist extends Component {
  componentDidMount() {
    const { getWhislist, userId, token } = this.props;
    getWhislist(userId, token);
  }

  remove = (productId) => {
    const { removeProd, userId, token } = this.props;
    removeProd(productId, userId, token);
  };

  render() {
    const { loaded, products } = this.props;
    if (!loaded) return <h4>Loading</h4>;
    return (
      <div>
        <h2>Wish list:</h2>
        <table>
          <tbody>
            {products.map(prod => (
              <ProductInWhislist product={prod} remove={this.remove} key={prod.productId} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: getAuthToken(state),
  userId: getAuthUserId(state),
  loaded: getWhislistLoaded(state),
  products: getWhislistProducts(state),
});

export default connect(
  mapStateToProps,
  {
    getWhislist: fetchWhislist,
    removeProd: removeProductWhisList,
  },
)(Whislist);

Whislist.propTypes = {
  getWhislist: PropTypes.func,
  userId: PropTypes.string,
  token: PropTypes.string.isRequired,
  loaded: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.objectOf),
  removeProd: PropTypes.func.isRequired,
};

Whislist.defaultProps = {
  products: null,
  getWhislist: null,
  userId: null,
};
