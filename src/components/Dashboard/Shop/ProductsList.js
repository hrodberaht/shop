import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Product from './Product';
import { getProducts } from '../../../store/products/selectors';

export class ProductsList extends Component {
  render() {
    const { products } = this.props;
    return (
      <div>
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: getProducts(state),
});

export default connect(mapStateToProps)(ProductsList);

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
