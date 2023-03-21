import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ButtonBack } from '../../components/ButtonBack';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import Quiz from './Quiz';
import AnswerButtons from './AnswerButtons';

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

  // クイズリストから、回答済みのクイズ
  const answeredQuizList = reviewQuizList.filter((quiz) => !quiz.isAnswered);
  const [quizIndex, setQuizIndex] = useState(reviewQuizList.length - answeredQuizList.length);
  const [showQuizIndex, setShowQuizIndex] = useState(quizIndex);

  const [activeQuiz, setActiveQuiz] = useState(quizList[quizIndex]);

  // 次のクイズ
  const changeNextQuiz = () => {
    setShowQuizIndex((prev) => prev + 1);
  };

  // 前のクイズ
  const changePrevQuiz = () => {
    if (showQuizIndex < 0) return;
    setShowQuizIndex((prev) => prev - 1);
  };

  return (
    <>
      <ButtonBack label="TOP" cb={backToTop} />

      <Quiz activeQuiz={activeQuiz} />
      <AnswerButtons
        quizIndex={quizIndex}
        showQuizIndex={showQuizIndex}
        totalReviewQuiz={reviewQuizList.length}
        changePrevQuiz={changePrevQuiz}
        changeNextQuiz={changeNextQuiz}
      />
    </>
  );
};

export default ReviewRoot;
