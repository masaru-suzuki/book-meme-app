import { Grid, Flex, Heading, IconButton, Box } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';

const MemeList = ({ bookId }) => {
  const { quizList } = useSelector((state) => state.quizReducer);
  // const editQuizList = quizList.filter((quiz) => (quiz.bookId = bookId));

  console.log(bookId);
  console.log(quizList);

  if (quizList) {
    return (
      <>
        {quizList.map((quiz) => {
          return (
            <Flex
              key={quiz.id}
              alignItems="center"
              gap="6"
              justifyContent="space-between"
              // onClick={() => handleEdit(quiz)}
            >
              <Heading size="sm">{quiz.quiz}</Heading>
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
