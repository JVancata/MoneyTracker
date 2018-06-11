import React, { Component } from 'react';
import App from './App';
import { Router } from 'react-router-dom';
import history from '../history/history';

import store from '../store';
import { Provider } from 'react-redux';

class Wrapper extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  }
}

export default Wrapper;
