import { useDispatch } from 'react-redux';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { add } from './store/modules/register';
import { nanoid } from 'nanoid';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  StackDivider,
  Input,
  Icon,
  IconButton,
  Button,
  Grid,
  Flex,
  Box,
} from '@chakra-ui/react';
import { HiOutlineTrash } from 'react-icons/hi';

const CustomListIcon = () => <Icon as={HiOutlineTrash} width="5" height="5" opacity="0.8" />;

const FormAdd = () => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values, e) {
    // TODO: 登録！みたいなFBあったらいいな。Chakra UIでできるかも
    const newBook = {
      id: nanoid(),
      title: values.title,
      reason: values.reason,
      purpose: [values.learned1, values.learned2, values.learned3, ...values.advancedPurpose],
    };
    console.log(newBook);
    // dispatch(add(newBook));
    reset();
    remove();
  }

  // Formの動的処理
  const { fields, append, remove } = useFieldArray({ control, name: 'advancedPurpose' });

  // 学びたいことを埋めた個数
  // const learnPoint = [!!watch('learned2'), !!watch('learned2'), !!watch('learned3')].filter(
  //   (val) => val === true
  // ).length;
  // console.log(learnPoint);

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

        <FormControl isInvalid={errors.reason}>
          <FormLabel htmlFor="reason" fontSize={'xs'} color="gray.700">
            何のためにこの本を読むのか
          </FormLabel>
          <Input
            id="reason"
            variant="filled"
            placeholder="reason"
            {...register('reason', {
              required: '分かりそうなことは必須です',
            })}
          />
          <FormErrorMessage>{errors.reason && errors.reason.message}</FormErrorMessage>
        </FormControl>
        <Grid gap="3">
          {/* TODO: purposeとadvancedPurposeを結合する */}
          <FormControl isInvalid={errors.learned1}>
            <FormLabel htmlFor="learned1" fontSize={'xs'} color="gray.700">
              この本から学びたいこと
            </FormLabel>
            <Input
              id="learned1"
              variant="filled"
              placeholder="目的その1"
              {...register('learned1', {
                required: '学びたいことは3つ記載してください',
              })}
            />
            <FormErrorMessage>{errors.learned1 && errors.learned1.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.learned2}>
            <Input
              id="learned2"
              variant="filled"
              placeholder="目的その2"
              {...register('learned2', {
                required: '学びたいことは3つ記載してください',
              })}
            />
            <FormErrorMessage>{errors.learned2 && errors.learned2.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.learned3}>
            <Input
              id="learned3"
              variant="filled"
              placeholder="目的その3"
              {...register('learned3', {
                required: '学びたいことは3つ記載してください',
              })}
            />
            <FormErrorMessage>{errors.learned3 && errors.learned3.message}</FormErrorMessage>
          </FormControl>

          {fields.map((item, index) => (
            <Flex key={item.id}>
              <Controller
                render={({ field }) => <Input variant="filled" placeholder={`目的その${index + 4}`} {...field} />}
                name={`advancedPurpose.${index}`}
                control={control}
              />
              <IconButton
                variant={'ghost'}
                colorScheme={'gray'}
                icon={<CustomListIcon />}
                onClick={() => remove(index)}
              />
            </Flex>
          ))}
          <Button type="button" colorScheme="gray" onClick={() => append([''])} size="sm" placeSelf={'center'}>
            追加する
          </Button>
        </Grid>

        <Button mt={4} colorScheme="linkedin" isLoading={isSubmitting} type="submit">
          登録する
        </Button>
      </VStack>
    </form>
  );
};

export default FormAdd;
