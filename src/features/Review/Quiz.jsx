import { CheckCircleIcon, CheckIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Card, Heading, CardBody, Stack, Text, Divider, CardFooter, ButtonGroup, Button } from '@chakra-ui/react';
import React from 'react';

// TODO: stageを表示
// TODO: 要素間のスペースを作る

const Quiz = ({ activeQuiz, answer, hasUnAnsweredQuiz }) => {
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
        <CardFooter w={'100%'}>
          {activeQuiz.isAnswered ? (
            hasUnAnsweredQuiz ? (
              <>
                <Button
                  rightIcon={<CheckIcon />}
                  colorScheme="teal"
                  variant="solid"
                  // flexBasis={'100'}
                  w={'100%'}
                  onClick={() => answer(true)}
                >
                  未回答の問題を答える
                </Button>
              </>
            ) : (
              <>
                <Button
                  rightIcon={<CheckIcon />}
                  colorScheme="teal"
                  isDisabled={true}
                  w={'100%'}
                  onClick={() => answer(true)}
                >
                  全て回答しました
                </Button>
              </>
            )
          ) : (
            <>
              <ButtonGroup spacing="2" justifyContent={'space-between'} w="100%">
                <Button
                  rightIcon={<SmallCloseIcon />}
                  colorScheme="teal"
                  variant="outline"
                  flexBasis={'50%'}
                  onClick={() => answer(false)}
                >
                  わからなかった
                </Button>
                <Button
                  rightIcon={<CheckIcon />}
                  colorScheme="teal"
                  variant="solid"
                  flexBasis={'50%'}
                  onClick={() => answer(true)}
                >
                  わかった
                </Button>
              </ButtonGroup>
            </>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default Quiz;
