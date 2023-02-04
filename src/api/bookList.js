import { collection, doc, getDocs } from 'firebase/firestore';
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
