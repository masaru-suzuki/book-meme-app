import { configureStore } from '@reduxjs/toolkit';
import reducer from './modules/register.js';
import quizReducer from './modules/quizReducer';

export default configureStore({
  reducer: {
    register: reducer,
    quizReducer: quizReducer,
  },
});
