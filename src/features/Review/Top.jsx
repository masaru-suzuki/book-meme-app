import { useSelector } from 'react-redux';
import { ButtonBack } from '../../components/ButtonBack';

const ReviewRoot = ({ backToTop }) => {
  const { status, quizList } = useSelector((state) => state.quiz);

  // 今日の日付も含めて、今日よりも前か判定する関数
  const isBeforeToday = (epochTime) => {
    const date = new Date(epochTime);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const time = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const todayTime = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

    return time <= todayTime;
  };

  // 今日復習するquizの配列を生成
  // 今日より前に復習日だった問題を格納
  const reviewQuizList = quizList.filter((quiz) => isBeforeToday(quiz.reviewDate));

  // 今日より前の日付のクイズを集計
  return (
    <>
      <ButtonBack label="TOP" cb={backToTop} />
      <h2>Review Page</h2>
      {quizList.filter((quiz) => {})}
    </>
  );
};

export default ReviewRoot;
