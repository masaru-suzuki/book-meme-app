import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import db from './firebase';

/**
 * firebaseからクイズの情報を一括取得
 */
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

const quizRef = (id) => doc(db, 'quizList', id);

/**
 * firebaseにクイズを登録する
 */
export const addQuizDB = (quiz) => {
  setDoc(quizRef(quiz.id), quiz);
};

/**
 * firebaseのクイズを更新する
 */
export const updateQuizDB = (quiz) => {
  updateDoc(quizRef(quiz.id), quiz);
};

/**
 * firebaseからクイズを削除する
 */
export const removeQuizDB = (quiz) => {
  deleteDoc(quizRef(quiz.id));
};
