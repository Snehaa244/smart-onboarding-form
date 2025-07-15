import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

//  Import ALL CSS globally here
import "./css/index.css";
import "./css/layout.css";
import "./css/form.css";
import "./css/progressbar.css";
import "./css/responsive.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

