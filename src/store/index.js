import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './modules/bookSlice';
import quizReducer from './modules/quizSlice';

export default configureStore({
  reducer: {
    bookReducer,
    quizReducer,
  },
});
