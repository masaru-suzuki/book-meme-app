import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonBack } from '../../components/ButtonBack';
import { Button, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import Quiz from './Quiz';
import AnswerButtons from './AnswerButtons';
import { update } from '../../store/modules/quizSlice';

const ReviewRoot = ({ backToTop }) => {
  const dispatch = useDispatch();
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
  // 今日より前に復習日だった問題を格納=今日回答するべきクイズ
  const reviewQuizList = quizList.filter((quiz) => isBeforeToday(quiz.reviewDate));

  // 今日復習するクイズの個数
  const totalReviewQuiz = reviewQuizList.length;

  // クイズリストから、回答済みのクイズ
  const answeredQuizList = reviewQuizList.filter((quiz) => quiz.isAnswered);

  // 回答済みクイズの個数
  // state更新したら、自動で更新される？
  // そうしたら、answeredQuizをuseStateで管理する必要なくなる？
  const answeredQuizIndex = answeredQuizList.length;

  // 実際のクイズのindex
  // 未回答の回答の最初のクイズにする
  // state更新したら、自動で更新される？
  // そうしたら、answeredQuizをuseStateで管理する必要なくなる？
  const [quizIndex, setQuizIndex] = useState(answeredQuizIndex - 1 < 0 ? 0 : answeredQuizIndex - 1);

  // 表示しているクイズのインデックス
  const [showQuizIndex, setShowQuizIndex] = useState(answeredQuizIndex > totalReviewQuiz && totalReviewQuiz);

  // 表示しているクイズ
  const activeQuiz = reviewQuizList[quizIndex] || reviewQuizList[quizIndex - 1];

  console.log(answeredQuizList);
  console.log({ totalReviewQuiz });
  console.log({ answeredQuizIndex });
  console.log({ quizIndex });
  console.log({ showQuizIndex });
  console.log(activeQuiz);

  const answerCorrect = () => {
    // 表示しているクイズが回答済
    // --未回答のクイズあり
    // ----未回答のクイズのインデックスに遷移
    // ----回答済みクイズの個数はそのまま
    // --未回答のクイズなし
    // ----QuizIndex,answeredQuizそのまま
    // ----回答済みクイズの個数はそのまま

    // 表示しているクイズが未回答
    // --未回答のクイズあり
    // ----未回答のクイズのインデックスに遷移
    // --未回答のクイズなし
    // ----QuizIndex,answeredQuizそのまま
    // --未回答のクイズのインデックスに遷移
    // --回答済みクイズの個数を+1

    const updatedQuiz = { ...activeQuiz };
    // isAnsweredをtrueに更新
    updatedQuiz.isAnswered = true;
    // stage操作
    dispatch(update(updatedQuiz));
  };

  const resetIsAnswered = () => {
    reviewQuizList.map((quiz) => {
      const resetQuiz = { ...quiz };
      resetQuiz.isAnswered = false;
      console.log(resetQuiz);
      dispatch(update(resetQuiz));
    });
  };

  const answerIncorrect = () => {
    if (answeredQuizIndex < totalReviewQuiz) {
      changeNextQuiz();
      setShowQuizIndex((prev) => prev + 1);
    }
  };

  // 次のクイズ
  const changeNextQuiz = () => {
    if (quizIndex > totalReviewQuiz - 1) return;
    setQuizIndex((prev) => prev + 1);
    setShowQuizIndex((prev) => prev + 1);
  };

  // 前のクイズ
  const changePrevQuiz = () => {
    if (quizIndex < 1) return;
    setQuizIndex((prev) => prev - 1);
    setShowQuizIndex((prev) => prev - 1);
  };

  console.log(reviewQuizList);
  return (
    <>
      <ButtonBack label="TOP" cb={backToTop} />
      <Button onClick={resetIsAnswered}>reset</Button>

      <Quiz activeQuiz={activeQuiz} answerCorrect={answerCorrect} answerIncorrect={answerIncorrect} />
      <AnswerButtons
        answeredQuizIndex={answeredQuizIndex}
        quizIndex={quizIndex}
        showQuizIndex={showQuizIndex}
        totalReviewQuiz={totalReviewQuiz}
        changePrevQuiz={changePrevQuiz}
        changeNextQuiz={changeNextQuiz}
      />
    </>
  );
};

export default ReviewRoot;
