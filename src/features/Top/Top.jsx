import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BookRoot from '../book/Top';
import RandomRoot from '../Random/Top';
import ReviewRoot from '../Review/Top';
import { Grid, Stack, Button, IconButton, Icon } from '@chakra-ui/react';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { checkAndExecute, updateLastExecutedDate } from '../../api/checkNewDay';
import { update } from '../../store/modules/quizSlice';

const CustomBookIcon = () => <Icon as={HiOutlineBookOpen} width="24px" height="24px" opacity="0.8" />;

const Top = () => {
  const dispatch = useDispatch();
  const { bookStatus, bookList } = useSelector((state) => state.book);
  const { quizStatus, quizList, lastExecutedDate } = useSelector((state) => state.quiz);
  const [rootFlag, setRootFlag] = useState('');
  const backToTop = () => setRootFlag('');
  // console.log({ lastExecutedDate });

  // 検証用: エポックタイムからyyyy/dd/mmの文字列に変換する関数
  const convertEpochTimeToDateString = (epochTime) => {
    const dateObj = new Date(epochTime);
    const year = dateObj.getFullYear();
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const date = ('0' + dateObj.getDate()).slice(-2);
    return year + '/' + month + '/' + date;
  };

  // 復習日を取得する関数
  // 起算点は前回の復習日
  const getReviewDate = (stage) => {
    const daysToAdd = Math.pow(2, stage);
    const newReviewDate = new Date(new Date(lastExecutedDate).getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    return newReviewDate.getTime();
  };

  // 問題の出題スケジュールを更新する関数
  const updateReviewDate = () => {
    console.log('回答済みのクイズの復習日を更新します');
    return new Promise((resolve, reject) => {
      const updatedQuizList = quizList.map((quiz) => {
        const updatedQuiz = { ...quiz };
        console.log(updatedQuiz);
        console.log(`前回復習日は${convertEpochTimeToDateString(updatedQuiz.reviewDate)}です。`);

        // isAnsweredがtrueの場合
        if (updatedQuiz.isAnswered) {
          // reviewDateを最後の復習日を起点に更新する
          updatedQuiz.reviewDate = getReviewDate(updatedQuiz.stage);
          // isAnsweredをfalseにする
          updatedQuiz.isAnswered = false;
        } else {
          // そのままのstateを維持する
          return;
        }

        console.log(`次の復習日は${convertEpochTimeToDateString(updatedQuiz.reviewDate)}です`);
        console.log(updatedQuiz);

        // DBに更新を反映する
        dispatch(update(updatedQuiz));
      });

      // setTimeout(() => {
      // 検証用に5秒待機する
      resolve(updatedQuizList);
      // }, 5000);
    });
  };

  // 1日1回だけ実行する関数を定義
  const executeDailyFunction = async () => {
    console.log('1日1回だけ実行する関数を実行しました');
    // DBのクイズのstateを更新する
    await updateReviewDate();
    // DBのlastExecutedDateを更新する
    updateLastExecutedDate();
    console.log('1日1回だけ実行する関数が完了しました');
  };

  // 1日1回だけ実行する関数を実行するロジック
  useEffect(() => {
    if (quizStatus === '取得済み') {
      console.log(`前回復習日は${convertEpochTimeToDateString(lastExecutedDate)}です。`);
      checkAndExecute(executeDailyFunction);
    }
  }, [quizStatus]);

  // リセットボタンを押したときに実行する関数
  const resetQuiz = () => {
    quizList.map((quiz) => {
      const updatedQuiz = { ...quiz };
      updatedQuiz.stage = 0;
      updatedQuiz.isAnswered = false;
      updatedQuiz.reviewDate = getReviewDate(updatedQuiz.stage);
      // dispatch(update(updatedQuiz));
    });
  };

  return (
    <>
      {rootFlag === '' && (
        <Grid placeContent={'center'} gap={4} height="calc(100%)">
          <Button colorScheme="linkedin" onClick={() => setRootFlag('review')}>
            今日の復習
          </Button>
          <Button colorScheme="linkedin" onClick={() => setRootFlag('random')}>
            ランダムモード
          </Button>
          <Button colorScheme="linkedin" onClick={() => resetQuiz()}>
            reset
          </Button>
          <Stack position="fixed" bottom="5" right="5" direction="column" spacing={2} align="center">
            <IconButton
              borderRadius="100%"
              w={14}
              h={14}
              aria-label="Search database"
              colorScheme={'gray'}
              icon={<CustomBookIcon />}
              onClick={() => setRootFlag('edit')}
            />
          </Stack>
        </Grid>
      )}
      {rootFlag === 'review' && <ReviewRoot backToTop={backToTop} quizList={quizList} />}
      {rootFlag === 'random' && <RandomRoot backToTop={backToTop} quizList={quizList} />}
      {rootFlag === 'edit' && <BookRoot backToTop={backToTop} bookList={bookList} status={bookStatus} />}
    </>
  );
};

export default Top;
