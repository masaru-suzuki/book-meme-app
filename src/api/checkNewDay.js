import { doc, updateDoc, getDoc } from 'firebase/firestore';
import db from './firebase';

const DAILY_FUNCTION_COLLECTION = 'dailyFunction';
const DAILY_FUNCTION_ID = 'jbIAzXazlZjfLQFgUH3a';
const docRef = doc(db, DAILY_FUNCTION_COLLECTION, DAILY_FUNCTION_ID);

/**
 * Firestoreから最後に実行された日付を取得し、現在の日付と比較して新しい日が始まっているかどうかを返す
 * @returns {Promise<boolean>} 新しい日が始まっていればtrue, そうでなければfalse
 */
export const checkIfNewDay = async () => {
  const lastExecutedDate = await getLastExecutedDate();
  const today = new Date().toDateString();

  return new Promise((resolve, reject) => {
    const isSameDay = !lastExecutedDate || lastExecutedDate !== today;
    resolve(isSameDay);
  });
};

/**
 * Firestoreから最後に実行された日付を取得する
 * @returns {Promise<string | null>} 最後に実行された日付
 * Firestoreにデータが存在するが、lastExecutedDateが存在しない場合はnullを返す
 */
export const getLastExecutedDate = async () => {
  const docSnap = await getDoc(docRef);
  const lastExecutedDate = docSnap.exists ? docSnap.data().lastExecutedDate : null;
  return lastExecutedDate;
};

/**
 * Firestoreに現在の日付を最後に実行された日付として保存する
 */
export const updateLastExecutedDate = () => {
  const today = new Date().toDateString();
  updateDoc(docRef, { lastExecutedDate: today });
};

/**
 * 新しい日が始まっている場合、指定された関数を実行し、最後に実行された日付を更新する
 * @param {Function} dailyFn 新しい日が始まった場合に実行する関数
 */
export const checkAndExecute = async (dailyFn) => {
  const isNewDay = await checkIfNewDay();

  if (isNewDay) {
    dailyFn();
    updateLastExecutedDate();
  }
};
