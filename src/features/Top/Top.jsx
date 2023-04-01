import { useEffect, useState } from 'react';
import BookRoot from '../book/Top';
import RandomRoot from '../Random/Top';
import ReviewRoot from '../Review/Top';
import { Grid, Stack, Button, IconButton, Icon } from '@chakra-ui/react';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { checkAndExecute, checkIfNewDay, updateLastExecutedDate } from '../../api/checkNewDay';

const CustomBookIcon = () => <Icon as={HiOutlineBookOpen} width="24px" height="24px" opacity="0.8" />;

const Top = () => {
  const { bookStatus, bookList } = useSelector((state) => state.book);
  const { quizStatus, quizList } = useSelector((state) => state.quiz);
  const [rootFlag, setRootFlag] = useState('');
  const backToTop = () => setRootFlag('');

  // 1日1回だけ実行する関数を定義
  const executeDailyFunction = () => {
    // メインロジックをここに実装
    console.log('今日の勉強アプリの処理が実行されました。');
  };

  // 1日1回だけ実行する関数を実行するロジック
  useEffect(() => {
    checkAndExecute(executeDailyFunction);
  }, []);

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
      {rootFlag === 'review' && <ReviewRoot backToTop={backToTop} />}
      {rootFlag === 'random' && <RandomRoot backToTop={backToTop} />}
      {rootFlag === 'edit' && <BookRoot backToTop={backToTop} bookList={bookList} status={status} />}
    </>
  );
};

export default Top;
