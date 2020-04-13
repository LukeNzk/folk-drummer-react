import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import * as serviceWorker from 'serviceWorker';
import AudioUtils, { AudioUtilsProvider } from 'common/AudioUtils';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from 'state';
import analyticsMiddleware from 'common/Analytics';

const audioUtils = new AudioUtils();

const store = createStore(rootReducer,
  applyMiddleware(analyticsMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <AudioUtilsProvider value={audioUtils}>
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    </AudioUtilsProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
