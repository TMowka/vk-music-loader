import React, { PureComponent } from 'react';
import settingsActions from './store/actions/settings';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from './components/Header/Header';
import AudioTable from './components/AudioTable/AudioTable';
import electronWorker from './electronWorker';

class App extends PureComponent {
  componentDidMount() {
    electronWorker.registerEventsListeners();
    this.props.fireGetSettings();
  }

  render() {
    return (
      <>
        <Header />
        <AudioTable />
      </>
    );
  }
}

App.propTypes = {
  fireGetSettings: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  fireGetSettings: () => dispatch(settingsActions.fireGet())
});

export default connect(null, mapDispatchToProps)(App);
