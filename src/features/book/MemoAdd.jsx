import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { add } from '../../store/modules/quizSlice.js';
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

const MemoAdd = ({ book }) => {
  const dispatch = useDispatch();
  const { id: bookId, title: bookTitle } = book;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values, e) {
    const id = nanoid();
    // 学習済みデータから取得したパラメータ
    // // 初期忘却度: 初期の難易度係数を表す数値
    // const initial_easiness_factor = 2.5;
    // // 勉強した回数: 1回の回答ごとに、この変数が1ずつ増加します。問題の回答履歴の中で、何回目の回答かを表します。
    // let initial_number_of_reviews = 0;
    // // 直近の回答時間(単位:秒):  前回の回答から次の回答までの間隔を表す数値です。
    // let last_interval = 1;
    // // 直近の回答の正誤: 前回の回答が正解だったかどうかを表す真偽値です。
    // let last_answer_correct = null;
    const today = new Date();

    const newQuiz = {
      id: id,
      bookId: bookId,
      bookTitle: bookTitle,
      quiz: values.quiz,
      answer: values.answer,
      stage: 0,
      reviewDate: today.getTime(), // reduxでエラーが出ないように、Unixエポックからの経過時間（ミリ秒）に変換する。
      //   easiness_factor: initial_easiness_factor,
      //   number_of_reviews: initial_number_of_reviews,
      //   last_review_interval: last_interval,
      //   last_answer_correct: last_answer_correct,
      //   next_review_date: new Date(Date.now() + last_interval * 1000),
    };
    dispatch(add(newQuiz));
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

export default MemoAdd;
