import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { add } from './store/modules/register';
import { nanoid } from 'nanoid';
import { ButtonBack } from '../../components/ButtonBack';
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button } from '@chakra-ui/react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

const BookAdd = ({ backToTop }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values, e) {
    // TODO: 登録！みたいなFBあったらいいな。Chakra UIでできるかも
    const newBook = {
      id: nanoid(),
      title: values.title,
      purpose: values.purpose,
      learned: [values.learned1, values.learned2, values.learned3],
    };
    dispatch(add(newBook));
    e.target.reset();
  }

  return (
    <>
      <ButtonBack label="TOP" cb={backToTop} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="hidden" id="id" defaultValue={nanoid} {...register('id')} />
        <FormControl isInvalid={errors.title}>
          <FormLabel htmlFor="title">title</FormLabel>
          <Input
            id="title"
            placeholder="title"
            {...register('title', {
              required: 'タイトルは必須です',
            })}
          />
          <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.purpose}>
          <FormLabel htmlFor="purpose">この本を読むと、何が分かりそうか？</FormLabel>
          <Input
            id="purpose"
            placeholder="purpose"
            {...register('purpose', {
              required: '分かりそうなことは必須です',
            })}
          />
          <FormErrorMessage>{errors.purpose && errors.purpose.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.learned1}>
          <FormLabel htmlFor="learned1">この本から学びたいこと1</FormLabel>
          <Input
            id="learned1"
            placeholder="learned1"
            {...register('learned1', {
              required: '学びたいことは3つ記載してください',
            })}
          />
          <FormErrorMessage>{errors.learned1 && errors.learned1.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.learned2}>
          <FormLabel htmlFor="learned2">この本から学びたいこと2</FormLabel>
          <Input
            id="learned2"
            placeholder="learned2"
            {...register('learned2', {
              required: '学びたいことは3つ記載してください',
            })}
          />
          <FormErrorMessage>{errors.learned2 && errors.learned2.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.learned3}>
          <FormLabel htmlFor="learned3">この本から学びたいこと3</FormLabel>
          <Input
            id="learned3"
            placeholder="learned3"
            {...register('learned3', {
              required: '学びたいことは3つ記載してください',
            })}
          />
          <FormErrorMessage>{errors.learned3 && errors.learned3.message}</FormErrorMessage>
        </FormControl>
        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          登録する
        </Button>
      </form>
    </>
  );
};

export default BookAdd;
