import { useEffect, useState } from 'react';
import { ButtonBack } from '../../components/ButtonBack';
import { VStack, Flex, Heading, IconButton, StackDivider, Button } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import MemoEdit from './MemoEdit';
import { useDispatch } from 'react-redux';
import { initQuizList } from '../../store/modules/quizSlice';

const Top = ({ bookList, backToTop }) => {
  const [memoRootFlag, setMemoRootFlag] = useState('');
  const [editingBook, setEditingBook] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initQuizList());
  }, []);

  const handleEdit = (book) => {
    setMemoRootFlag('edit');
    setEditingBook(book);
  };

  const backToMemoRoot = () => setMemoRootFlag('');

  return (
    <>
      {memoRootFlag === '' && (
        <>
          <ButtonBack label="TOP" cb={backToTop} />
          <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
            <StackDivider borderColor="gray.200" />

            {/* TODO: タッチデバイス想定なのでスライドで削除できるようにする */}
            {bookList.map((book) => {
              return (
                <Flex
                  key={book.id}
                  alignItems="center"
                  gap="6"
                  justifyContent="space-between"
                  onClick={() => handleEdit(book)}
                >
                  <Heading size="sm">{book.title}</Heading>
                  <IconButton
                    variant={'ghost'}
                    size={'xs'}
                    aria-label="Search database"
                    icon={<EditIcon w={4} h={4} />}
                  />
                </Flex>
              );
            })}
            <StackDivider borderColor="gray.200" />
          </VStack>
        </>
      )}
      {memoRootFlag === 'edit' && <MemoEdit backToMemoRoot={backToMemoRoot} book={editingBook} />}
    </>
  );
};

export default Top;
