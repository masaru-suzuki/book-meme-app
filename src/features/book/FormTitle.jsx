import { FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react';

const FormReason = ({ register, formState }) => {
  const { errors } = formState;

  return (
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
  );
};

export default FormReason;
