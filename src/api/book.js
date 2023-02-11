import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import db from './firebase';

/**
 * firebaseから本の情報を一括取得
 */
export const fetchBookList = () => {
  return new Promise((resolve) => {
    const asyncFunc = async () => {
      const booksCollection = collection(db, 'books');
      const response = await getDocs(booksCollection);
      const dbBooks = response.docs.map((book) => ({ ...book.data() }));
      return dbBooks;
    };
    const bookList = asyncFunc();

    resolve(bookList);
  });
};

/**
 * firebaseのrefを返す
 */
const bookRef = (id) => doc(db, 'books', id);

/**
 * firebaseに本を登録する
 */
export const addBookDB = (book) => {
  setDoc(bookRef(book.id), book);
};

/**
 * firebaseの本を更新する
 */
export const updateBookDB = (book) => {
  updateDoc(bookRef(book.id), book);
};

/**
 * firebaseから本を削除する
 */
export const removeBookDB = (book) => {
  deleteDoc(bookRef(book.id));
};
