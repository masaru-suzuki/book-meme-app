import { useState } from 'react';
import FixedButton from './FixedButton';
import MemoList from './MemoList';
import { Box, Button } from '@chakra-ui/react';
import { remove } from '../../store/modules/bookSlice';
import { useDispatch, useSelector } from 'react-redux';
import Form from './Form';

const Book = ({ bookId, backToBookRoot }) => {
  const dispatch = useDispatch();
  const { bookList } = useSelector((state) => state.book);

  // FIXME: /book/top.jsx でglobal state読み込んで、それを子コンポーネントに渡した際、更新を検知されない。
  // TODO: どうしてか調べる...
  const book = bookList.find((book) => book.id === bookId);

  const [bookFlag, setBookFlag] = useState(''); // "" || "bookEdit" || "delete" || "memoEdit"
  const removeBook = () => {
    backToBookRoot();
    dispatch(remove(book));
  };
  return (
    <>
      <Form book={book} backToBookRoot={backToBookRoot} />
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
