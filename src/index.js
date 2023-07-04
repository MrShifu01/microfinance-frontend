import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ErrorBoundary from './components/ErrorBoundary';

// Create a root element using ReactDOM.createRoot() and select the 'root' element in the DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app component wrapped in necessary providers and components
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </Provider>
);
