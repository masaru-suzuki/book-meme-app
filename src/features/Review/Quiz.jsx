import { CheckCircleIcon, CheckIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Card, Heading, CardBody, Stack, Text, Divider, CardFooter, ButtonGroup, Button } from '@chakra-ui/react';
import React from 'react';

// TODO: stageを表示
// TODO: 要素間のスペースを作る

const Quiz = ({ activeQuiz, answerCorrect, answerIncorrect }) => {
  return (
    <>
      <Card maxW="sm">
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="md" position="relative">
              {activeQuiz.quiz}
              <CheckCircleIcon
                w={3}
                h={3}
                position="absolute"
                top="4px"
                left="-16px"
                color={activeQuiz.isAnswered ? 'teal.500' : 'gray.200'}
              />
            </Heading>
            <Heading size="xs">答え</Heading>
            <Text>{activeQuiz.answer}</Text>
            <Text>{activeQuiz.bookTitle}</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2" justifyContent={'space-between'} w="100%">
            <Button
              rightIcon={<SmallCloseIcon />}
              colorScheme="teal"
              variant="outline"
              flexBasis={'50%'}
              onClick={() => answerIncorrect()}
            >
              わからなかった
            </Button>
            <Button
              rightIcon={<CheckIcon />}
              colorScheme="teal"
              variant="solid"
              flexBasis={'50%'}
              onClick={() => answerCorrect()}
            >
              わかった
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
};

export default Quiz;
