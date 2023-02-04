import { configureStore } from '@reduxjs/toolkit';
import reducer from './modules/register.js';

export default configureStore({
  reducer: {
    register: reducer,
  },
});
