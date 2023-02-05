import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { add } from './store/modules/register';
import { nanoid } from 'nanoid';
import { FormControl, FormLabel, FormErrorMessage, VStack, StackDivider, Input, Button } from '@chakra-ui/react';

const FormAdd = () => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    watch,
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack divider={<StackDivider borderColor="gray.100" />} spacing={5} align="stretch">
        <Input type="hidden" id="id" defaultValue={nanoid} {...register('id')} />
        <FormControl isInvalid={errors.title}>
          <FormLabel htmlFor="title" fontSize={'xs'} color="gray.700">
            タイトル
          </FormLabel>
          <Input
            id="title"
            variant="filled"
            placeholder="title"
            {...register('title', {
              required: 'タイトルは必須です',
            })}
          />
          <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.purpose}>
          <FormLabel htmlFor="purpose" fontSize={'xs'} color="gray.700">
            この本を読むと、何が分かりそうか？
          </FormLabel>
          <Input
            id="purpose"
            variant="filled"
            placeholder="purpose"
            {...register('purpose', {
              required: '分かりそうなことは必須です',
            })}
          />
          <FormErrorMessage>{errors.purpose && errors.purpose.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.learned1}>
          <FormLabel htmlFor="learned1" fontSize={'xs'} color="gray.700">
            この本から学びたいこと1
          </FormLabel>
          <Input
            id="learned1"
            variant="filled"
            placeholder="learned1"
            {...register('learned1', {
              required: '学びたいことは3つ記載してください',
            })}
          />
          <FormErrorMessage>{errors.learned1 && errors.learned1.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.learned2}>
          <FormLabel htmlFor="learned2" fontSize={'xs'} color="gray.700">
            この本から学びたいこと2
          </FormLabel>
          <Input
            id="learned2"
            variant="filled"
            placeholder="learned2"
            {...register('learned2', {
              required: '学びたいことは3つ記載してください',
            })}
          />
          <FormErrorMessage>{errors.learned2 && errors.learned2.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.learned3}>
          <FormLabel htmlFor="learned3" fontSize={'xs'} color="gray.700">
            この本から学びたいこと3
          </FormLabel>
          <Input
            id="learned3"
            variant="filled"
            placeholder="learned3"
            {...register('learned3', {
              required: '学びたいことは3つ記載してください',
            })}
          />
          <FormErrorMessage>{errors.learned3 && errors.learned3.message}</FormErrorMessage>
        </FormControl>
        <Button mt={4} colorScheme="linkedin" isLoading={isSubmitting} type="submit">
          登録する
        </Button>
      </VStack>
    </form>
  );
};

export default FormAdd;
