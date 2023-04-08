// 検証用: エポックタイムからyyyy/dd/mmの文字列に変換する関数
export const convertEpochTimeToDateString = (epochTime) => {
  const dateObj = new Date(epochTime);
  const year = dateObj.getFullYear();
  const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  const date = ('0' + dateObj.getDate()).slice(-2);
  return year + '/' + month + '/' + date;
};
