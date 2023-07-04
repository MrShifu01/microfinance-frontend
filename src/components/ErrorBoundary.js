import React, { Component } from 'react';
import ErrorPage from '../pages/ErrorPage';

// Component to handle errors better for the user experience

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate an error has occurred
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      // You can customize the error message or render an error component here
      return <ErrorPage/>;
    }

    // Render the children components normally if no error has occurred
    return this.props.children;
  }
}

export default ErrorBoundary;
