import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addQuizDB, fetchQuizList, removeQuizDB, updateQuizDB } from '../../api/quiz.js';

const initialState = {
  quizList: [],
  quizStatus: '...Loading',
};

const quizSlice = createSlice({
  name: 'quizSlice',
  initialState: initialState,
  reducers: {
    /**
     * @param {object} payload 登録するクイズのオブジェクト
     */
    add(state, { payload }) {
      const newQuizList = [...state.quizList, payload];
      addQuizDB(payload);
      state.quizList = newQuizList;
    },
    /**
     * @param {object} payload 登録するクイズのオブジェクト
     */
    update(state, { payload }) {
      updateQuizDB(payload);
      const quizList = [...state.quizList];
      const newQuizList = quizList.map((quiz) => (quiz.id === payload.id ? payload : quiz));
      state.quizList = newQuizList;
    },
    /**
     * @param {string} payload id
     */
    remove(state, { payload }) {
      removeQuizDB(payload);
      const quizList = [...state.quizList];
      const newQuizList = quizList.filter((quiz) => quiz.id !== payload);
      state.quizList = newQuizList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initQuizList.pending, (state) => {
        state.quizStatus = '...Loading';
      })
      .addCase(initQuizList.fulfilled, (state, { payload }) => {
        state.quizStatus = '取得済み';
        state.quizList = payload;
      })
      .addCase(initQuizList.rejected, (state) => {
        state.quizStatus = 'データの取得に失敗しました。';
      });
  },
});

const { add, remove, update } = quizSlice.actions;

const initQuizList = createAsyncThunk('quizSlice/asyncInit', async () => await fetchQuizList());

export { add, remove, update, initQuizList };

export default quizSlice.reducer;
