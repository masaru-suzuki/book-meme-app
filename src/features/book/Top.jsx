import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { initState } from './store/modules/register';
import { fetchBookList } from '../../api/bookList';
import { ButtonBack } from '../../components/ButtonBack';
import { VStack, Flex, Heading, IconButton, StackDivider, Button } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import BookEdit from './BookEdit';
import FormEdit from './FormEdit';
import FormAdd from './FormAdd';

const BookRoot = ({ backToTop }) => {
  const dispatch = useDispatch();
  const { bookList } = useSelector((state) => state.register);
  const [bookRootFlag, setBookRootFlag] = useState(''); // "" || "add" || "edit"
  const [editingBook, setEditingBook] = useState();

  useEffect(() => {
    const init = async () => {
      const dbBooks = await fetchBookList();
      dispatch(initState(dbBooks));
    };

    init();
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
