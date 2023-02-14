import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { update, remove as bookRemove } from '../../store/modules/bookSlice';
import { nanoid } from 'nanoid';
import { FormControl, FormLabel, FormErrorMessage, VStack, StackDivider, Input, Icon, Grid } from '@chakra-ui/react';

const FormConfirm = ({ book, backToBookRoot, bookFlag }) => {
  // TODO: flagがeditなら編集できるようにする
  // そうすればformを使い回すことができる
  const dispatch = useDispatch();
  const { id, title, reason, purpose } = book;
  const advancedPurposeStatic = purpose === undefined || purpose.slice(3) === undefined ? [] : purpose.slice(3);
  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  // 本の更新
  function onSubmit(values, e) {
    // TODO: 登録！みたいなFBあったらいいな。Chakra UIでできるかも
    // 空の場合は登録されないようにする
    const newPurpose = purpose?.map((_, index) => values[`purpose${index}`]).filter((val) => val !== '') || [];
    const advancedList = values.advancedPurpose.filter((val) => val !== '');

    const newBook = {
      id: id,
      title: values.title,
      reason: values.reason,
      purpose: [...newPurpose, ...advancedList],
    };

    backToBookRoot();
    dispatch(update(newBook));
  }

  // 本の削除
  const removeBook = () => {
    dispatch(bookRemove(book));
    backToBookRoot();
  };

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
            defaultValue={title}
            isReadOnly={!(bookFlag === 'bookEdit')}
            {...register('title', {
              required: 'タイトルは必須です',
            })}
          />
          <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.reason}>
          <FormLabel htmlFor="reason" fontSize={'xs'} color="gray.700">
            何のためにこの本を読むのか
          </FormLabel>
          <Input
            id="reason"
            variant="filled"
            placeholder="reason"
            defaultValue={reason}
            isReadOnly={!(bookFlag === 'bookEdit')}
            {...register('reason', {
              required: '分かりそうなことは必須です',
            })}
          />
          <FormErrorMessage>{errors.reason && errors.reason.message}</FormErrorMessage>
        </FormControl>
        <Grid gap="3">
          <FormLabel htmlFor="purpose1" fontSize={'xs'} color="gray.700">
            この本から学びたいこと
          </FormLabel>

          {purpose?.map((item, index) => {
            return (
              <FormControl key={item + index}>
                <Input
                  id={`purpose${index}`}
                  variant="filled"
                  placeholder={`学びたいことその${index + 1}`}
                  defaultValue={item}
                  isReadOnly={!(bookFlag === 'bookEdit')}
                  {...register(`purpose${index}`)}
                />
              </FormControl>
            );
          })}
        </Grid>
      </VStack>
    </form>
  );
};

export default FormConfirm;
