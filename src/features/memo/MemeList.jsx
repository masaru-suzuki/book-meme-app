import { Grid, Flex, Heading, IconButton, Box } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

const MemeList = ({ memoList }) => {
  console.log(memoList);
  if (memoList) {
    return (
      <>
        {memoList.map((book) => {
          return (
            <Flex
              key={book.id}
              alignItems="center"
              gap="6"
              justifyContent="space-between"
              // onClick={() => handleEdit(book)}
            >
              <Heading size="sm">{book.title}</Heading>
              <IconButton variant={'ghost'} size={'xs'} aria-label="Search database" icon={<EditIcon w={4} h={4} />} />
            </Flex>
          );
        })}
      </>
    );
  } else {
    return (
      <Box mt={'6'}>
        <p>まだメモがありません。</p>
        <p>プラスボタンから追加しましょう。</p>
      </Box>
    );
  }
};

export default MemeList;
