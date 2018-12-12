import React, { PureComponent } from 'react';

import Header from './components/Header/Header';
import AudioTable from './components/AudioTable/AudioTable';
import electronWorker from './electronWorker';

class App extends PureComponent {
  componentDidMount() {
    electronWorker.registerEventsListeners();
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

export default App;
