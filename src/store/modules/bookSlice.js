import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { fetchBookList } from '../../api/bookList';
import db from '../../api/firebase.js';

const initialState = {
  // TODO: loadingをflagで管理する
  bookList: [],
  status: 'Loading...',
};

const bookSlice = createSlice({
  name: 'bookSlice',
  initialState: initialState,
  reducers: {
    add(state, { payload }) {
      const newBookList = [...state.bookList, payload];
      // firebase
      setDoc(doc(db, 'books', payload.id), payload);
      // state
      state.bookList = newBookList;
    },
    update(state, { payload }) {
      // TODO: payloadで渡ってくるオブジェクトはfirebaseのオブジェクト型と揃える
      // 管理できないか？
      const bookList = [...state.bookList];
      const newBookList = bookList.map((book) => (book.id === payload.id ? payload : book));
      // firebase
      const bookRef = doc(db, 'books', payload.id);
      const newBook = { ...payload };
      updateDoc(bookRef, newBook);
      // state
      state.bookList = newBookList;
    },
    remove(state, { payload }) {
      const bookList = [...state.bookList];
      const newBookList = bookList.filter((book) => book.id !== payload.id);
      // firebase
      const bookRef = doc(db, 'books', payload.id);
      deleteDoc(bookRef);
      // state
      state.bookList = newBookList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initBookList.pending, (state) => {
        state.status = '...Loading(asyncThunk)';
      })
      .addCase(initBookList.fulfilled, (state, { payload }) => {
        state.status = '取得済み';
        state.bookList = payload;
      })
      .addCase(initBookList.rejected, (state) => {
        state.status = 'データの取得に失敗しました。';
      });
  },
});

const { add, remove, update } = bookSlice.actions;

const initBookList = createAsyncThunk('bookSlice/asyncInit', async () => await fetchBookList());

export { add, remove, update, initBookList };

export default bookSlice.reducer;
