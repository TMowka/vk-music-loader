import React from 'react';

import Header from './components/Header/Header';
import AudioTable from './components/AudioTable/AudioTable';

const App = React.memo(() => {
  return (
    <>
      <Header />
      <AudioTable />
    </>
  );
});

export default App;
