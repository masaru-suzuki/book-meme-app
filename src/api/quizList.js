import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import db from './firebase';

/**
 * firebaseからクイズの情報を一括取得
 */
// TODO: fetchBookListと
export const fetchQuizList = () => {
  return new Promise((resolve) => {
    const asyncFunc = async () => {
      const quizCollection = collection(db, 'quizList');
      const response = await getDocs(quizCollection);
      const dbQuizList = response.docs.map((quiz) => ({ ...quiz.data() }));
      return dbQuizList;
    };
    const quizList = asyncFunc();

    resolve(quizList);
  });
};

export const addQuizDB = (id, quiz) => {
  setDoc(doc(db, 'quizList', id), quiz);
};
