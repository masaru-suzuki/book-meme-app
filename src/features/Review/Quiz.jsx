import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Card, Heading, CardBody, Stack, Text, Divider, CardFooter, ButtonGroup, Button } from '@chakra-ui/react';
import React from 'react';

// TODO: stageを表示
// TODO: 要素間のスペースを作る

const Quiz = ({ activeQuiz }) => {
  return (
    <>
      <Card maxW="sm">
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="md">{activeQuiz.quiz}</Heading>
            <Heading size="xs">答え</Heading>
            <Text>{activeQuiz.answer}</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2" justifyContent={'space-between'} w="100%">
            <Button rightIcon={<SmallCloseIcon />} colorScheme="teal" variant="outline" flexBasis={'50%'}>
              わからなかった
            </Button>
            <Button rightIcon={<CheckIcon />} colorScheme="teal" variant="solid" flexBasis={'50%'}>
              わかった
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
};

export default Quiz;
