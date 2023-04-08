import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ButtonBack } from '../../components/ButtonBack';
import { Button } from '@chakra-ui/react';
import Quiz from './Quiz';
import AnswerButtons from './AnswerButtons';
import { update } from '../../store/modules/quizSlice';
import { isBeforeToday } from '../../util/isBeforeToday';

const ReviewRoot = ({ backToTop, quizList }) => {
  const dispatch = useDispatch();

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
  const totalAnsweredQuiz = answeredQuizList.length;

  // 未回答のクイズのインデックス
  const unAnsweredQuizIndex = reviewQuizList.findIndex((quiz) => !quiz.isAnswered);

  // 未回答のクイズがあるか
  const hasUnAnsweredQuiz = unAnsweredQuizIndex > -1;

  // 未回答のクイズの配列のインデックスを返す関数
  // 未回答の回答の最初のクイズにする
  // 全て回答していたら、最後の問題のインデックスを返す
  const getQuizIndex = () => (hasUnAnsweredQuiz ? unAnsweredQuizIndex : totalReviewQuiz - 1);

  // 実際のクイズのindex
  const [quizIndex, setQuizIndex] = useState(getQuizIndex());

  // クイズに回答した時に、クイズのインデックスを更新する
  const [answerFlag, setAnswerFlag] = useState(false);

  useEffect(() => {
    hasUnAnsweredQuiz && setQuizIndex(getQuizIndex());
  }, [answerFlag]);

  // 表示しているクイズのインデックスを返す関数
  const getShowQuizIndex = () => (totalAnsweredQuiz >= totalReviewQuiz ? totalReviewQuiz - 1 : totalAnsweredQuiz);

  // 表示しているクイズのインデックス
  // クイズのインデックスは０スタートだが、表示は１スタート
  const [showQuizIndex, setShowQuizIndex] = useState(getShowQuizIndex());

  // 表示しているクイズ
  const activeQuiz = reviewQuizList[quizIndex] || reviewQuizList[quizIndex - 1];

  const answer = (isCorrect) => {
    setAnswerFlag((prev) => !prev);

    const updatedQuiz = { ...activeQuiz };

    if (activeQuiz.isAnswered) {
    } else {
      // isCorrectによって処理を分ける
      if (isCorrect) {
        updatedQuiz.stage += 1;
      } else {
        updatedQuiz.stage = updatedQuiz.stage - 1 < 0 ? 0 : updatedQuiz.stage - 1;
      }
    }

    console.log(updatedQuiz.stage);

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

  // 次のクイズを表示
  const showNextQuiz = () => {
    if (quizIndex > totalReviewQuiz - 1) return;
    setQuizIndex((prev) => prev + 1);
    setShowQuizIndex((prev) => prev + 1);
  };

  // 前のクイズを表示
  const showPrevQuiz = () => {
    if (quizIndex < 1) return;
    setQuizIndex((prev) => prev - 1);
    setShowQuizIndex((prev) => prev - 1);
  };

  return (
    <>
      {totalReviewQuiz ? (
        <>
          <ButtonBack label="TOP" cb={backToTop} />
          <Button onClick={resetIsAnswered}>reset</Button>
          <Quiz
            activeQuiz={activeQuiz}
            showNextQuiz={showNextQuiz}
            answer={answer}
            hasUnAnsweredQuiz={hasUnAnsweredQuiz}
          />
          <AnswerButtons
            totalAnsweredQuiz={totalAnsweredQuiz}
            quizIndex={quizIndex}
            showQuizIndex={showQuizIndex}
            totalReviewQuiz={totalReviewQuiz}
            showPrevQuiz={showPrevQuiz}
            showNextQuiz={showNextQuiz}
          />
        </>
      ) : (
        <>
          <ButtonBack label="TOP" cb={backToTop} />
          <p>お疲れ様です！クイズはありません！</p>
        </>
      )}
    </>
  );
};

export default ReviewRoot;
