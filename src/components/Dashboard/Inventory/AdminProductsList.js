import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConnectedAdminProduct from './AdminProduct';
import { getProductsAll, getProductsLoaded } from '../../../store/products/selectors';
import { fetchProducts } from '../../../store/products/actionCreators';
import { getAuthToken } from '../../../store/authenticate/selectors';

export class AdminProductsList extends Component {
  componentDidMount() {
    const { getProducts, token } = this.props;
    getProducts(token);
  }

  render() {
    const { products, loaded } = this.props;
    if (!loaded) return <p>Loading...</p>;
    return (
      <div className="admin-product__list">
        <table>
          <tbody>
            <tr>
              <th>Name:</th>
              <th>Image:</th>
              <th>Type:</th>
              <th>Price:</th>
              <th>Stock:</th>
              <th>Edit:</th>
              <th>Remove:</th>
            </tr>
            {products.map(product => (
              <tr key={product.id}>
                <ConnectedAdminProduct product={product} />
              </tr>
            ))}
          </tbody>
        </table>
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
  {
    getProducts: fetchProducts,
  },
)(AdminProductsList);

AdminProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  getProducts: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  loaded: PropTypes.bool.isRequired,
};
