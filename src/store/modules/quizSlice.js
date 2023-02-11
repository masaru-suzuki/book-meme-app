import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addQuizDB } from '../../api/quizList.js';

const localStorageBookList = {
  bookList: JSON.parse(localStorage.getItem('quizList')),
  status: 'Loading...',
};

const quizSlice = createSlice({
  name: 'quizSlice',
  initialState: localStorageBookList,
  reducers: {
    add(state, { payload }) {
      const newQuizList = [...state.quizList, payload.newQuiz];
      addQuizDB(payload.id, payload.newQuiz);

      // // localStorage
      localStorage.setItem('bookList', JSON.stringify(newQuizList));

      // // state
      state.quizList = newQuizList;
    },
    update(state, { payload }) {
      // // TODO: payloadで渡ってくるオブジェクトはfirebaseのオブジェクト型と揃える
      // // 管理できないか？
      // const bookList = [...state.bookList];
      // const newBookList = bookList.map((book) => (book.id === payload.id ? payload : book));
      // // firebase
      // const bookRef = doc(db, 'books', payload.id);
      // const newBook = { ...payload };
      // updateDoc(bookRef, newBook);
      // // localStorage
      // localStorage.setItem('bookList', JSON.stringify(newBookList));
      // // state
      // state.bookList = newBookList;
    },
    remove(state, { payload }) {
      // const bookList = [...state.bookList];
      // const newBookList = bookList.filter((book) => book.id !== payload.id);
      // // firebase
      // const bookRef = doc(db, 'books', payload.id);
      // deleteDoc(bookRef);
      // // localStorage
      // localStorage.setItem('bookList', JSON.stringify(newBookList));
      // // state
      // state.bookList = newBookList;
    },
  },
  extraReducers: (builder) => {
    builder
      // TODO: initialStateのstatusが表示されており、pendingの方は表示されないのを確認
      .addCase(initMemoList.pending, (state) => {
        state.status = 'Loading(asyncThunk)';
      })
      .addCase(initMemoList.fulfilled, (state, { payload }) => {
        state.status = '取得済み';
        state.quizList = payload;

        // localStorage
        localStorage.setItem('quizList', JSON.stringify(payload));
      })
      .addCase(initMemoList.rejected, (state) => {
        state.status = 'データの取得に失敗しました。';
      });
  },
});

const { add, remove, update } = quizSlice.actions;

const initMemoList = createAsyncThunk('quizSlice/asyncInit', async (payload) => payload);

export { add, remove, update, initMemoList };

export default quizSlice.reducer;
