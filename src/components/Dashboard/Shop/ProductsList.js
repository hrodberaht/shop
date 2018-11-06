import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConnectedProduct from './Product';
import {
  getProductsAll,
  getProductsLoaded,
  getProductsError,
} from '../../../store/products/selectors';
import { fetchProducts } from '../../../store/products/actionCreator';
import { getAuthToken } from '../../../store/auth/selectors';

export class ProductsList extends Component {
  componentDidMount() {
    const { handleFetch, token } = this.props;
    handleFetch(token);
  }

  list = () => {
    const { products } = this.props;
    return products.filter(product => !product.remove);
  };

  render() {
    const { loaded, error } = this.props;
    if (error) return <h4>{error}</h4>;
    return (
      <div className="products-list">
        {loaded ? (
          this.list().map(product => <ConnectedProduct key={product.id} product={product} />)
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
  error: getProductsError(state),
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
  error: PropTypes.string,
};

ProductsList.defaultProps = {
  error: null,
};
