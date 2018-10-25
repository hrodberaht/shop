import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Product from './Product';
import { getProductsAll, getProductsLoaded } from '../../../store/products/selectors';
import fetchProducts from '../../../store/products/actionCreator';
import { getAuthToken } from '../../../store/auth/selectors';

export class ProductsList extends Component {
  componentDidMount() {
    const { handleFetch, token } = this.props;
    handleFetch(token);
  }

  render() {
    const { products, loaded } = this.props;
    return (
      <div>
        {loaded ? (
          products.map(product => <Product key={product.id} product={product} />)
        ) : (
          <p>Loading:</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: getProductsAll(state),
  token: getAuthToken(state),
  loaded: getProductsLoaded(state),
});

export default connect(
  mapStateToProps,
  { handleFetch: fetchProducts },
)(ProductsList);

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleFetch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  loaded: PropTypes.bool.isRequired,
};
