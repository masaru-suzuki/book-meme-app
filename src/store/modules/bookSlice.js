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
      setDoc(doc(db, 'books', payload.id), payload);

      // localStorage
      localStorage.setItem('bookList', JSON.stringify(newBookList));

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

      // localStorage
      localStorage.setItem('bookList', JSON.stringify(newBookList));

      // state
      state.bookList = newBookList;
    },
    remove(state, { payload }) {
      const bookList = [...state.bookList];
      const newBookList = bookList.filter((book) => book.id !== payload.id);

      // firebase
      const bookRef = doc(db, 'books', payload.id);
      deleteDoc(bookRef);

      // localStorage
      localStorage.setItem('bookList', JSON.stringify(newBookList));

      // state
      state.bookList = newBookList;
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

const { add, remove, update } = bookSlice.actions;

const initBookList = createAsyncThunk('bookSlice/asyncInit', async () => await fetchBookList());

export { add, remove, update, initBookList };

export default bookSlice.reducer;