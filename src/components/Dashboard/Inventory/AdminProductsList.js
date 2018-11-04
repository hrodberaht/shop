import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConnectedAdminProduct from './AdminProduct';
import { getProductsAll } from '../../../store/products/selectors';

export class AdminProductsList extends Component {
  componentDidMount() {}

  render() {
    const { products } = this.props;
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Name:</th>
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
});

export default connect(mapStateToProps)(AdminProductsList);

AdminProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
