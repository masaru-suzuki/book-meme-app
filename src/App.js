import React from 'react';
import Top from './features/Top/Top';
import './App.css';
import store from './features/book/store';
import { Provider } from 'react-redux';
import { Grid } from '@chakra-ui/react';

function App() {
  return (
    <Grid className="App" gridTemplateRows={'48px 1fr'}>
      <header className="App-header">
        <h1>読書アプリ</h1>
      </header>
      <div className="App-contents">
        <Provider store={store}>
          <Top />
        </Provider>
      </div>
    </Grid>
  );
}

export default App;
