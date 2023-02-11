import React, { useEffect } from 'react';
import Top from './features/Top/Top';
import './App.css';
import { Grid } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { initBookList } from './store/modules/bookSlice';
import { initQuizList } from './store/modules/quizSlice';

function App() {
  const dispatch = useDispatch();

  // state初期化
  useEffect(() => {
    dispatch(initBookList());
    dispatch(initQuizList());
  }, []);

  return (
    <Grid className="App" gridTemplateRows={'48px 1fr'}>
      <header className="App-header">
        <h1>読書アプリ</h1>
      </header>
      <div className="App-contents">
        <Top />
      </div>
    </Grid>
  );
}

export default App;
