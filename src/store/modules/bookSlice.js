import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addBookDB, fetchBookList, removeBookDB, updateBookDB } from '../../api/book';

const initialState = {
  // TODO: loadingをflagで管理する
  bookList: [],
  status: 'Loading...',
};

const bookSlice = createSlice({
  name: 'bookSlice',
  initialState: initialState,
  reducers: {
    /**
     * @param {object} payload 登録する本のオブジェクト
     */
    add(state, { payload }) {
      addBookDB(payload);
      const newBookList = [...state.bookList, payload];
      state.bookList = newBookList;
    },
    /**
     * @param {object} payload 更新する本のオブジェクト
     */
    update(state, { payload }) {
      updateBookDB(payload);
      const bookList = [...state.bookList];
      const newBookList = bookList.map((book) => (book.id === payload.id ? payload : book));
      state.bookList = newBookList;
    },
    /**
     * @param {string} payload 削除する本のid
     */
    remove(state, { payload }) {
      removeBookDB(payload);
      const bookList = [...state.bookList];
      const newBookList = bookList.filter((book) => book.id !== payload);
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
