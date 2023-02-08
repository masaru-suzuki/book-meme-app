import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initState } from '../book/store/modules/register';
import { fetchBookList } from '../../api/bookList';
import { fetchQuizList } from '../../api/quizList';
import BookRoot from '../book/Top';
import MemoRoot from '../memo/Top';
import RandomRoot from '../Random/Top';
import ReviewRoot from '../Review/Top';
import { Grid, Stack, Button, IconButton, Icon } from '@chakra-ui/react';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { BiListPlus } from 'react-icons/bi';
import { initMemoList } from '../book/store/modules/quizReducer';

const CustomListIcon = () => <Icon as={BiListPlus} width="24px" height="24px" opacity="0.8" />;
const CustomBookIcon = () => <Icon as={HiOutlineBookOpen} width="24px" height="24px" opacity="0.8" />;

const Top = () => {
  const dispatch = useDispatch();
  const [rootFlag, setRootFlag] = useState('');
  const { bookList } = useSelector((state) => state.register);
  const backToTop = () => setRootFlag('');

  // 非同期で書籍情報を取得（それまではlocalStorageのデータを表示)
  useEffect(() => {
    const init = async () => {
      const dbBooks = await fetchBookList();
      const dbQuizList = await fetchQuizList();
      dispatch(initState(dbBooks));
      dispatch(initMemoList(dbQuizList));
    };

    init();
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
              icon={<CustomListIcon />}
              onClick={() => setRootFlag('add')}
            />
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
      {rootFlag === 'add' && <MemoRoot backToTop={backToTop} bookList={bookList} />}
      {rootFlag === 'edit' && <BookRoot backToTop={backToTop} bookList={bookList} />}
    </>
  );
};

export default Top;
