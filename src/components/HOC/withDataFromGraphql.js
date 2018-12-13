import React, { Component } from 'react';

const withDataFromGraphql = (WrappedComponent) => {
  class WithDataFromGraphql extends Component {
    render() {
      const { loading, error } = this.props.fetchedData;
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return <WrappedComponent {...this.props} />;
    }
  }

  return WithDataFromGraphql;
};

export default withDataFromGraphql;
