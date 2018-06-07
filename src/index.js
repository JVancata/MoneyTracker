import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper from './components/Wrapper';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Wrapper />, document.getElementById('root'));
registerServiceWorker();
