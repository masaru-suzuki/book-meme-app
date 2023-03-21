import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { Button, Grid, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const AnswerButtons = ({ quizIndex, showQuizIndex, totalReviewQuiz, changePrevQuiz, changeNextQuiz }) => {
  const [progressColor, setProgressColor] = useState('red.400');
  const [trackColor, setTrackColor] = useState('red.100');

  // クイズの進捗
  const progress = (quizIndex / totalReviewQuiz) * 100;

  // プログレスバーの色
  useEffect(() => {
    if (progress >= 100) {
      setProgressColor('blue.400');
      setTrackColor('blue.100');
    } else if (progress > 66) {
      setProgressColor('green.400');
      setTrackColor('green.100');
    } else if (progress > 33) {
      setProgressColor('orange.400');
      setTrackColor('orange.100');
    } else {
      setProgressColor('red.400');
      setTrackColor('red.100');
    }
  }, [quizIndex]);

  return (
    <Grid gridTemplateColumns="repeat(3, 1fr)" mt={10} spacing={8} justifyContent="space-between">
      {showQuizIndex > 0 && (
        <Button
          gridColumn="1 / 2"
          leftIcon={<ChevronLeftIcon />}
          colorScheme="teal"
          variant="outline"
          onClick={changePrevQuiz}
        >
          前へ
        </Button>
      )}
      <CircularProgress
        gridColumn="2 / 3"
        justifySelf="center"
        value={progress}
        color={progressColor}
        trackColor={trackColor}
        thickness="10px"
        size="40px"
      >
        <CircularProgressLabel>{`${showQuizIndex}/${totalReviewQuiz}`}</CircularProgressLabel>
      </CircularProgress>
      {showQuizIndex < totalReviewQuiz && (
        <Button
          gridColumn="3 / 4"
          rightIcon={<ChevronRightIcon />}
          colorScheme="teal"
          variant="outline"
          onClick={changeNextQuiz}
        >
          次へ
        </Button>
      )}
    </Grid>
  );
};

export default AnswerButtons;
