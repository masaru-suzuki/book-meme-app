import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initBookList } from '../../store/modules/bookSlice';
import { ButtonBack } from '../../components/ButtonBack';
import { VStack, Flex, Heading, IconButton, StackDivider, Button } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import FormEdit from './FormEdit';
import FormAdd from './FormAdd';

const BookRoot = ({ backToTop }) => {
  const [bookRootFlag, setBookRootFlag] = useState(''); // "" || "add" || "edit"
  const [editingBook, setEditingBook] = useState();
  const { status, bookList } = useSelector((state) => state.book);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBookList());
  }, []);

  const handleEdit = (book) => {
    setBookRootFlag('edit');
    setEditingBook(book);
  };

  const backToBookRoot = () => setBookRootFlag('');

  return (
    <>
      {bookRootFlag === '' && (
        <>
          <ButtonBack label="TOP" cb={backToTop} />
          <h1>{status}</h1>
          <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
            <StackDivider borderColor="gray.200" />

            {/* TODO: スライドで削除できるようにする */}
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
            <Button mt={'4'} colorScheme="linkedin" onClick={() => setBookRootFlag('add')}>
              本を追加する
            </Button>
          </VStack>
        </>
      )}
      {bookRootFlag === 'add' && (
        <>
          <ButtonBack label="BACK" cb={backToBookRoot} />
          <FormAdd />
        </>
      )}
      {bookRootFlag === 'edit' && (
        <>
          <ButtonBack label="BACK" cb={backToBookRoot} />
          <FormEdit book={editingBook} backToBookRoot={backToBookRoot} />
        </>
      )}
    </>
  );
};

export default BookRoot;
