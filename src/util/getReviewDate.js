/**
 * @param {number} stage
 * @param {number} lastExecutedDate
 * @returns {number} newReviewDate
 * @description 復習日を取得する関数
 * 起算点は前回の復習日
 */
export const getReviewDate = (stage, lastExecutedDate) => {
  const daysToAdd = Math.pow(2, stage);
  const newReviewDate = new Date(new Date(lastExecutedDate).getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  return newReviewDate.getTime();
};
