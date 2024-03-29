import { useState } from 'react';
import { ButtonBack } from '../../components/ButtonBack';
import { VStack, Flex, Heading, IconButton, StackDivider, Button } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import FormAdd from './FormAdd';
import Book from './Book';
import BookNG from './BookNG';

const BookRoot = ({ bookList, backToTop }) => {
  const [bookRootFlag, setBookRootFlag] = useState(''); // "" || "add" || "edit" || "detail"
  const [editingBook, setEditingBook] = useState();

  const handleEdit = (book) => {
    setBookRootFlag('detail');
    setEditingBook(book);
  };

  const backToBookRoot = () => setBookRootFlag('');

  return (
    <>
      {bookRootFlag === '' && (
        <>
          <ButtonBack label="TOP" cb={backToTop} />
          <VStack divider={<StackDivider borderColor="gray.200" />} mt={-4} spacing={4} align="stretch">
            <StackDivider borderColor="gray.200" />
            {/* TODO: フリックで削除できるようにする */}
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
                  <IconButton variant={'ghost'} aria-label="Search database" icon={<EditIcon w={4} h={4} />} />
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
          <FormAdd backToBookRoot={backToBookRoot} />
        </>
      )}
      {bookRootFlag === 'detail' && (
        <>
          {/* TODO: どうして値が更新されないのか？ */}
          {/* <BookNG book={editingBook} backToBookRoot={backToBookRoot} /> */}
          <Book bookId={editingBook.id} backToBookRoot={backToBookRoot} />
        </>
      )}
    </>
  );
};

export default BookRoot;
