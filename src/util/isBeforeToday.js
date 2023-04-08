/**
 * @param {number} epochTime
 * @return {boolean}
 * @description 今日の日付も含めて、今日よりも前か判定する関数
 */
export const isBeforeToday = (epochTime) => {
  const date = new Date(epochTime);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const time = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const todayTime = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

  return time <= todayTime;
};
