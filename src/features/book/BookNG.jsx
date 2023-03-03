import { useRef, useState } from 'react';
import FixedButton from './FixedButton';
import MemoList from './MemoList';
import { ButtonBack } from '../../components/ButtonBack';
import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import FormConfirm from './FormConfirm';
import FormEdit from './FormEdit';
import MemoAdd from './MemoAdd';
import MemoEdit from './MemoEdit';
import { remove } from '../../store/modules/bookSlice';
import AlertModal from './AlertModal';

const BookNG = ({ book, backToBookRoot }) => {
  const dispatch = useDispatch();

  const [editingMemo, setEditingMemo] = useState({});

  // 編集後に更新されたstateが渡ってくると期待していた
  // Firebaseでは更新されているが、DOMに反映されない
  // 本の追加・削除は可能（stateが更新を検知してくれる）
  console.log(book);

  // "" || "bookEdit" || "memoAdd" || "memoEdit"
  const [bookFlag, setBookFlag] = useState('');

  /**
   * 書籍詳細TOPへ戻る
   */
  const backToBookDetail = () => setBookFlag('');

  /**
   * メモの編集画面に遷移する
   * @param {object} memo 編集するクイズ
   */
  const changeMemoEditMode = (memo) => {
    setBookFlag('memoEdit');
    setEditingMemo(memo);
  };

  /**
   * 本の削除をする際のアラートモーダル
   */
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRemove = () => {
    dispatch(remove(book.id));
    backToBookRoot();
    onClose();
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
          <AlertModal isOpen={isOpen} onClose={onClose} handleRemove={handleRemove} />
          <Box mt={6}>
            <Button onClick={onOpen} colorScheme="red" w={'100%'}>
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
    </>
  );
};

export default BookNG;
