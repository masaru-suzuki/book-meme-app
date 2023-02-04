import { useState } from 'react';
import BookRoot from '../book/Top';
import BookAdd from '../book/BookAdd';
import RandomRoot from '../Random/Top';
import ReviewRoot from '../Review/Top';
import { Grid, Stack, Button, IconButton, ButtonGroup } from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';

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
              icon={<EditIcon w={4} h={4} />}
              onClick={() => setRootFlag('edit')}
            />
            <IconButton
              borderRadius="100%"
              w={14}
              h={14}
              aria-label="Search database"
              colorScheme={'gray'}
              icon={<AddIcon w={4} h={4} />}
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
