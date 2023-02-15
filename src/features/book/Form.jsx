import { useDispatch } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { add } from '../../store/modules/bookSlice';
import { nanoid } from 'nanoid';
import { VStack, StackDivider, Input } from '@chakra-ui/react';
import FormPurpose from './FormPurpose';
import FormTitle from './FormTitle';
import FormReason from './FormReason';

const Form = ({ book, backToBookRoot, bookFlag }) => {
  const dispatch = useDispatch();

  const { handleSubmit, register, reset, control, watch, formState } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: 'advancedPurpose' });

  function onSubmit(values, e) {
    // TODO: 登録！みたいなFBあったらいいな。Chakra UIでできるかも
    const newBook = {
      id: nanoid(),
      title: values.title,
      reason: values.reason,
      purpose: [values.purpose1, values.purpose2, values.purpose3, ...values.advancedPurpose],
    };
    dispatch(add(newBook));
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack divider={<StackDivider borderColor="gray.100" />} spacing={5} align="stretch">
        <Input type="hidden" id="id" defaultValue={nanoid} {...register('id')} />
        <FormTitle register={register} formState={formState} />
        <FormReason register={register} formState={formState} />
        <FormPurpose
          fields={fields}
          append={append}
          remove={remove}
          watch={watch}
          control={control}
          formState={formState}
          register={register}
        />
      </VStack>
    </form>
  );
};

export default Form;
