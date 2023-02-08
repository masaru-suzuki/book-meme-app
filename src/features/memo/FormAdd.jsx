import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { add } from '../book/store/modules/quizReducer.js';
import { nanoid } from 'nanoid';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  StackDivider,
  Input,
  Button,
  Textarea,
} from '@chakra-ui/react';

const FormAdd = ({ bookId, bookTitle }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values, e) {
    const id = nanoid();
    const newQuiz = {
      id: id,
      bookId: bookId,
      bookTitle: bookTitle,
      quiz: values.quiz,
      answer: values.answer,
      stage: 0,
    };
    // TODO: 今日の復習するタイミングリストに登録する
    dispatch(add({ id, newQuiz }));
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack divider={<StackDivider borderColor="gray.100" />} mt="5" spacing={5} align="stretch">
        <FormControl isInvalid={errors.quiz}>
          <FormLabel htmlFor="quiz" fontSize={'xs'} color="gray.700">
            クイズ
          </FormLabel>
          <Textarea
            id="quiz"
            variant="filled"
            placeholder="quiz"
            {...register('quiz', {
              required: 'クイズの内容は必須です',
            })}
          />
          <FormErrorMessage>{errors.quiz && errors.quiz.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.answer}>
          <FormLabel htmlFor="answer" fontSize={'xs'} color="gray.700">
            答え
          </FormLabel>
          <Input
            id="answer"
            variant="filled"
            placeholder="p40"
            {...register('answer', {
              required: '答えのページは必須です',
            })}
          />
          <FormErrorMessage>{errors.answer && errors.answer.message}</FormErrorMessage>
        </FormControl>
        <Button mt={4} colorScheme="linkedin" isLoading={isSubmitting} type="submit">
          登録する
        </Button>
      </VStack>
    </form>
  );
};

export default FormAdd;
