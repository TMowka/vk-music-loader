import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers';
import 'typeface-roboto';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#607D8B',
      main: '#455A64',
      dark: '#263238',
      contrastText: '#fff'
    },
    secondary: {
      light: '#2196F3',
      main: '#1976D2',
      dark: '#0D47A1',
      contrastText: '#000'
    }
  },
  typography: {
    useNextVariants: true
  }
});

export const store = createStore(rootReducer, undefined, applyMiddleware(thunk));

ReactDOM.render(
  <MuiThemeProvider theme={theme} >
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();