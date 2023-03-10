import { VStack, StackDivider, Flex, Heading, Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const MemoList = ({ bookId, changeMemoEditMode }) => {
  const { quizList } = useSelector((state) => state.quiz);
  const bookQuizList = quizList.filter((quiz) => quiz.bookId === bookId);

  if (bookQuizList.length) {
    return (
      <>
        <Heading size="md">メモ一覧</Heading>
        <VStack divider={<StackDivider borderColor="gray.200" />} mt={0} spacing={4} align="stretch">
          <StackDivider borderColor="gray.200" />
          {bookQuizList.map((quiz) => {
            return (
              <Flex
                key={quiz.id}
                alignItems="center"
                gap="6"
                justifyContent="space-between"
                onClick={() => changeMemoEditMode(quiz)}
              >
                <Heading size="sm">{quiz.quiz}</Heading>
              </Flex>
            );
          })}
          <StackDivider borderColor="gray.200" />
        </VStack>
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

export default MemoList;
