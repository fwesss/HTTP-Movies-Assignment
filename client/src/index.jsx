import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app/App';

ReactDOM.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
  document.getElementById('root')
);
