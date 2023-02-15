import { useState } from 'react';
import FormConfirm from './FormConfirm';
import FixedButton from './FixedButton';
import MemoList from './MemoList';
import { Box, Button } from '@chakra-ui/react';
import { remove } from '../../store/modules/bookSlice';
import { useDispatch } from 'react-redux';

const Book = ({ book, backToBookRoot }) => {
  const dispatch = useDispatch();
  const [bookFlag, setBookFlag] = useState(''); // "" || "bookEdit" || "delete" || "memoEdit"
  const removeBook = () => {
    backToBookRoot();
    dispatch(remove(book));
  };
  return (
    <>
      <FormConfirm book={book} backToBookRoot={backToBookRoot} bookFlag={bookFlag} />
      <FixedButton />
      <Box mt={12}>
        <MemoList bookId={book.id} />
      </Box>
      {/* TODO: add modal confirm action */}
      <Box mt={6}>
        <Button onClick={removeBook} colorScheme="red" w={'100%'}>
          本を削除
        </Button>
      </Box>
    </>
  );
};

export default Book;
