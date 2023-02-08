import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import db from '../../../../api/firebase.js';
import { addQuizDB } from '../../../../api/quizList.js';

const localStorageBookList = {
  bookList: JSON.parse(localStorage.getItem('bookList')),
  status: 'Loading...',
};

const mock = {
  quizList: [
    {
      id: 'anietornsatirsent488888',
      title: 'test',
    },
  ],
  status: 'Loading...',
};

const quizReducer = createSlice({
  name: 'quizReducer',
  initialState: mock,
  reducers: {
    add(state, { payload }) {
      console.log(state);
      const newQuizList = [...state.quizList, payload.quizList];
      addQuizDB(payload.id, payload.newQuiz);
      console.log(newQuizList);

      // // localStorage
      // localStorage.setItem('bookList', JSON.stringify(newBookList));

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
      .addCase(initState.pending, (state) => {
        state.status = 'Loading(asyncThunk)';
      })
      .addCase(initState.fulfilled, (state, { payload }) => {
        state.status = '取得済み';
        state.bookList = payload;

        // localStorage
        localStorage.setItem('bookList', JSON.stringify(payload));
      })
      .addCase(initState.rejected, (state) => {
        state.status = 'データの取得に失敗しました。';
      });
  },
});

const { add, remove, update } = quizReducer.actions;

const initState = createAsyncThunk('quizReducer/asyncInit', async (payload) => payload);

export { add, remove, update, initState };

export default quizReducer.reducer;
