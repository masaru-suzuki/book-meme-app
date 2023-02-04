import { useState } from 'react';
import BookRoot from '../book/Top';
import BookAdd from '../book/BookAdd';
import RandomRoot from '../Random/Top';
import ReviewRoot from '../Review/Top';
import { Grid, Stack, Button, IconButton, Icon } from '@chakra-ui/react';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { BiListPlus } from 'react-icons/bi';

const CustomListIcon = ()=><Icon as={BiListPlus} width="24px" height="24px" opacity="0.8"/>
const CustomBookIcon = ()=><Icon as={HiOutlineBookOpen} width="24px" height="24px" opacity="0.8"/>

const Top = () => {
  const [rootFlag, setRootFlag] = useState('');
  const backToTop = () => setRootFlag('');


  return (
    <>
      {rootFlag === '' && (
        <Grid placeContent={'center'} gap={4} height="calc(100%)">
          <Button colorScheme="linkedin" onClick={() => setRootFlag('review')}>
            今日の復習
          </Button>
          <Button colorScheme="linkedin" onClick={() => setRootFlag('random')}>
            ランダムモード
          </Button>
          <Stack position="fixed" bottom="5" right="5" direction="column" spacing={2} align="center">
            <IconButton
              borderRadius="100%"
              w={14}
              h={14}
              aria-label="Search database"
              colorScheme={'gray'}
              icon={<CustomListIcon />}
              onClick={() => setRootFlag('edit')}
            />
            <IconButton
              borderRadius="100%"
              w={14}
              h={14}
              aria-label="Search database"
              colorScheme={'gray'}
              icon={<CustomBookIcon />}
              onClick={() => setRootFlag('add')}
            />
          </Stack>
        </Grid>
      )}
      {rootFlag === 'review' && <ReviewRoot backToTop={backToTop} />}
      {rootFlag === 'random' && <RandomRoot backToTop={backToTop} />}
      {rootFlag === 'edit' && <BookRoot backToTop={backToTop} />}
      {rootFlag === 'add' && <BookAdd backToTop={backToTop} />}
    </>
  );
};

export default Top;
