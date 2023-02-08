import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
// import { add } from './store/modules/register';
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

const FormAdd = ({ bookId }) => {
  const dispatch = useDispatch();
  console.log(bookId);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values, e) {
    const newQuiz = {
      id: nanoid(),
      quiz: values.quiz,
      answer: values.answer,
      stage: 0,
    };
    console.log(newQuiz);
    // TODO: 今日の復習するタイミングリストに登録する
    // dispatch(add(newBook));
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
