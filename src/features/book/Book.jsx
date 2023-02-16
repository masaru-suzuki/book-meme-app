import { useState } from 'react';
import FixedButton from './FixedButton';
import MemoList from './MemoList';
import { ButtonBack } from '../../components/ButtonBack';
import { Box, Button } from '@chakra-ui/react';
import { remove } from '../../store/modules/bookSlice';
import { useDispatch, useSelector } from 'react-redux';
import FormConfirm from './FormConfirm';
import FormEdit from './FormEdit';
import MemoAdd from './MemoAdd';
import MemoEdit from './MemoEdit';

const Book = ({ bookId, backToBookRoot }) => {
  const dispatch = useDispatch();
  const { bookList } = useSelector((state) => state.book);
  const [editingMemo, setEditingMemo] = useState({});

  // FIXME: /book/top.jsx でglobal state読み込んで、それを子コンポーネントに渡した際、更新を検知されない。
  // TODO: どうしてか調べる...
  const book = bookList.find((book) => book.id === bookId);

  const [bookFlag, setBookFlag] = useState(''); // "" || "bookEdit" || "delete" || "memoAdd" || "memoEdit"

  const removeBook = () => {
    // backToBookRoot();
    // dispatch(remove(book));
    setBookFlag('delete');
  };

  const backToBookDetail = () => setBookFlag('');

  const changeMemoEditMode = (memo) => {
    setBookFlag('memoEdit');
    setEditingMemo(memo);
  };

  return (
    <>
      {bookFlag === '' && (
        <>
          <ButtonBack label="BACK" cb={backToBookRoot} />
          <FormConfirm book={book} />
          <Button w={'100%'} mt={4} colorScheme="linkedin" onClick={() => setBookFlag('bookEdit')}>
            編集する
          </Button>
          <FixedButton setBookFlag={setBookFlag} />
          <Box mt={12}>
            <MemoList bookId={book.id} changeMemoEditMode={changeMemoEditMode} />
          </Box>
          {/* TODO: add modal confirm action */}
          <Box mt={6}>
            <Button onClick={removeBook} colorScheme="red" w={'100%'}>
              本を削除
            </Button>
          </Box>
        </>
      )}
      {bookFlag === 'bookEdit' && (
        <>
          <ButtonBack label="BACK" cb={backToBookDetail} />
          <FormEdit book={book} backToBookDetail={backToBookDetail} />
        </>
      )}
      {bookFlag === 'memoEdit' && (
        <>
          <ButtonBack label="BACK" cb={backToBookDetail} />
          <MemoEdit editingMemo={editingMemo} backToBookDetail={backToBookDetail} />
        </>
      )}
      {bookFlag === 'memoAdd' && (
        <>
          <ButtonBack label="BACK" cb={backToBookDetail} />
          <MemoAdd book={book} />
        </>
      )}
      {bookFlag === 'delete' && (
        <>
          <ButtonBack label="BACK" cb={backToBookDetail} />
          <p>delete</p>
        </>
      )}
    </>
  );
};

export default Book;
