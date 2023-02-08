import { ButtonBack } from '../../components/ButtonBack';
import MemeList from './MemeList.jsx';
import { Grid, Stack, Button, IconButton, Icon, Heading, Divider } from '@chakra-ui/react';
import { HiPlus } from 'react-icons/hi';
import { useState } from 'react';
import FormAdd from './FormAdd';

const CustomListIcon = () => <Icon as={HiPlus} width="24px" height="24px" opacity="0.8" />;

const MemoEdit = ({ book, backToMemoRoot }) => {
  const [bookMemoFlag, setBookMemoFlag] = useState('');

  return (
    <>
      <ButtonBack label="BACK" cb={backToMemoRoot} />
      <Heading mt={'5'} pb={'2'}>
        {book.title}
      </Heading>
      <Divider />
      {bookMemoFlag === '' && (
        <>
          <MemeList bookId={book.id} />
          <IconButton
            borderRadius="100%"
            position="fixed"
            bottom="5"
            right="5"
            w={14}
            h={14}
            aria-label="Search database"
            colorScheme={'gray'}
            icon={<CustomListIcon />}
            onClick={() => setBookMemoFlag('add')}
          />
        </>
      )}
      {bookMemoFlag === 'add' && <FormAdd bookId={book.id} bookTitle={book.title} />}
    </>
  );
};

export default MemoEdit;
