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

  // クイズリストから、回答済みのクイズ
  const answeredQuizList = reviewQuizList.filter((quiz) => quiz.isAnswered);

  // 回答済みクイズの個数
  // state更新したら、自動で更新される？
  // そうしたら、answeredQuizをuseStateで管理する必要なくなる？
  const [answeredQuiz, setAnsweredQuiz] = useState(answeredQuizList.length);

  // 表示しているクイズのindex
  // 未回答の回答の最初のクイズにする
  // state更新したら、自動で更新される？
  // そうしたら、answeredQuizをuseStateで管理する必要なくなる？
  const [showQuizIndex, setShowQuizIndex] = useState(answeredQuiz);

  // 表示しているクイズ
  const [activeQuiz, setActiveQuiz] = useState(reviewQuizList[showQuizIndex]);

  // console.log(answeredQuizList);
  // console.log({ answeredQuiz });
  // console.log({ showQuizIndex });
  // console.log(activeQuiz);

  const answerCorrect = () => {
    // update();
    // 表示しているクイズが回答済
    // --未回答のクイズあり
    // ----未回答のクイズのインデックスに遷移
    // ----回答済みクイズの個数はそのまま
    // --未回答のクイズなし
    // ----showQuizIndex,answeredQuizそのまま
    // ----回答済みクイズの個数はそのまま

    // 表示しているクイズが未回答
    // --未回答のクイズあり
    // ----未回答のクイズのインデックスに遷移
    // --未回答のクイズなし
    // ----showQuizIndex,answeredQuizそのまま
    // --未回答のクイズのインデックスに遷移
    // --回答済みクイズの個数を+1

    // if (answeredQuiz < reviewQuizList.length) {
    //   if (showQuizIndex < reviewQuizList.length) {
    //     changeNextQuiz();
    //     setAnsweredQuiz((prev) => prev + 1);
    //   } else {
    //   }
    // }
    const updatedQuiz = { ...activeQuiz };
    // isAnsweredをtrueに更新
    updatedQuiz.isAnswered = true;
    // stage操作
    dispatch(update(updatedQuiz));
  };

  const resetIsAnswered = () => {
    console.log('reset');
  };

  const answerIncorrect = () => {
    if (answeredQuiz < reviewQuizList.length) {
      changeNextQuiz();
      setAnsweredQuiz((prev) => prev + 1);
    }
  };

  // 次のクイズ
  const changeNextQuiz = () => {
    if (showQuizIndex > reviewQuizList.length) return;
    setShowQuizIndex((prev) => prev + 1);
    setActiveQuiz(reviewQuizList[showQuizIndex]);
  };

  // 前のクイズ
  const changePrevQuiz = () => {
    if (showQuizIndex < 0) return;
    setShowQuizIndex((prev) => prev - 1);
    setActiveQuiz(reviewQuizList[showQuizIndex - 1]);
  };

  console.log(reviewQuizList);
  return (
    <>
      <ButtonBack label="TOP" cb={backToTop} />
      <Button onClick={resetIsAnswered}>reset</Button>

      <Quiz activeQuiz={activeQuiz} answerCorrect={answerCorrect} answerIncorrect={answerIncorrect} />
      <AnswerButtons
        quizIndex={answeredQuiz}
        showQuizIndex={showQuizIndex}
        totalReviewQuiz={reviewQuizList.length}
        changePrevQuiz={changePrevQuiz}
        changeNextQuiz={changeNextQuiz}
      />
    </>
  );
};

export default ReviewRoot;
