import React, { Component } from 'react';

const withDataFromGraphql = (WrappedComponent) => {
  class WithDataFromGraphql extends Component {
    render() {
      if (this.props.fetchedData.loading) return <p>Loading...</p>;
      if (this.props.fetchedData.error) return <p>Error :(</p>;
      return <WrappedComponent {...this.props} />;
    }
  }

  return WithDataFromGraphql;
};

export default withDataFromGraphql;
