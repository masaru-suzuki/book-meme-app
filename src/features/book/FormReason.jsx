import { FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react';

const FormReason = ({ register, formState }) => {
  const { errors } = formState;

  return (
    <FormControl isInvalid={errors.reason}>
      <FormLabel htmlFor="reason" fontSize={'xs'} color="gray.700">
        タイトル
      </FormLabel>
      <Input
        id="reason"
        variant="filled"
        placeholder="どうしてこの本読むのか"
        {...register('reason', {
          required: '理由は必須です',
        })}
      />
      <FormErrorMessage>{errors.reason && errors.reason.message}</FormErrorMessage>
    </FormControl>
  );
};

export default FormReason;
