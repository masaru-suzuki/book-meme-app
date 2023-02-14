import { useState } from 'react';
import FormConfirm from './FormConfirm';
import FixedButton from './FixedButton';
import MemoList from './MemoList';
import { Box } from '@chakra-ui/react';

const Book = ({ book, backToBookRoot }) => {
  const [bookFlag, setBookFlag] = useState(''); // "" || "bookEdit" || "delete" || "memoEdit"

  return (
    <>
      <FormConfirm book={book} backToBookRoot={backToBookRoot} bookFlag={bookFlag} />
      <FixedButton />
      <Box mt={12}>
        <MemoList bookId={book.id} />
      </Box>
    </>
  );
};

export default Book;
