import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addQuizDB, fetchQuizList, updateQuizDB } from '../../api/quizList.js';

const initialState = {
  quizList: [],
  status: 'Loading...',
};

const quizSlice = createSlice({
  name: 'quizSlice',
  initialState: initialState,
  reducers: {
    add(state, { payload }) {
      console.log(payload);
      const newQuizList = [...state.quizList, payload];
      addQuizDB(payload);

      // state
      state.quizList = newQuizList;
    },
    update(state, { payload }) {
      updateQuizDB(payload);
      const quizList = [...state.quizList];
      const newQuizList = quizList.map((quiz) => (quiz.id === payload.id ? payload : quiz));
      state.quizList = newQuizList;
    },
    remove(state, { payload }) {},
  },
  extraReducers: (builder) => {
    builder
      // TODO: initialStateのstatusが表示されており、pendingの方は表示されないのを確認
      .addCase(initQuizList.pending, (state) => {
        state.status = 'Loading(asyncThunk)';
      })
      .addCase(initQuizList.fulfilled, (state, { payload }) => {
        state.status = '取得済み';
        state.quizList = payload;
      })
      .addCase(initQuizList.rejected, (state) => {
        state.status = 'データの取得に失敗しました。';
      });
  },
});

const { add, remove, update } = quizSlice.actions;

const initQuizList = createAsyncThunk('quizSlice/asyncInit', async (payload) => await fetchQuizList());

export { add, remove, update, initQuizList };

export default quizSlice.reducer;
