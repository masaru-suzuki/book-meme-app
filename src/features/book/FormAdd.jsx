import { useDispatch } from 'react-redux';
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form';
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
  CircularProgress,
  CircularProgressLabel,
  Grid,
  Flex,
  Box,
} from '@chakra-ui/react';
import { HiOutlineTrash } from 'react-icons/hi';
import { useEffect, useState } from 'react';

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
    console.log(e.target.value);
    const newBook = {
      id: nanoid(),
      title: values.title,
      reason: values.reason,
      purpose: [values.purpose1, values.purpose2, values.purpose3, ...values.advancedPurpose],
    };
    console.log(newBook);
    // dispatch(add(newBook));
    reset();
    remove();
  }

  // Formの動的処理
  const { fields, append, remove } = useFieldArray({ control, name: 'advancedPurpose' });

  // 学びたいことを埋めた個数
  const [purposeCount, setPurposeCount] = useState(0);
  const watchPurpose = watch(['purpose1', 'purpose2', 'purpose3']);
  const watchAdvancedPurpose = watch('advancedPurpose');

  // 追加するボタンを押したら、監視するフィールドを1つ増やす
  const addField = () => {
    append(['']);
  };

  useEffect(() => {
    if (!watchAdvancedPurpose) return;
    const purposeCount = watchPurpose.filter((val) => val !== '').length;
    const advancedPurposeCount = watchAdvancedPurpose.filter((val) => val !== '').length;
    const filledField = purposeCount + advancedPurposeCount;
    setPurposeCount(filledField);
  }, [watchPurpose, watchAdvancedPurpose]);

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
          <FormControl isInvalid={errors.purpose1}>
            <Flex justifyContent={'space-between'} alignItems="center" mb={'4'}>
              <FormLabel htmlFor="purpose1" fontSize={'xs'} color="gray.700">
                この本から学びたいこと
              </FormLabel>
              <CircularProgress value={(purposeCount * 100) / 3} color="green.400">
                <CircularProgressLabel>{`${purposeCount}/3`}</CircularProgressLabel>
              </CircularProgress>
            </Flex>
            <Input
              id="purpose1"
              variant="filled"
              placeholder="学びたいことその1"
              {...register('purpose1', {
                required: '学びたいことは3つ記載してください',
              })}
            />
            <FormErrorMessage>{errors.purpose1 && errors.purpose1.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.purpose2}>
            <Input
              id="purpose2"
              variant="filled"
              placeholder="学びたいことその2"
              {...register('purpose2', {
                required: '学びたいことは3つ記載してください',
              })}
            />
            <FormErrorMessage>{errors.purpose2 && errors.purpose2.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.purpose3}>
            <Input
              id="purpose3"
              variant="filled"
              placeholder="学びたいことその3"
              {...register('purpose3', {
                required: '学びたいことは3つ記載してください',
              })}
            />
            <FormErrorMessage>{errors.purpose3 && errors.purpose3.message}</FormErrorMessage>
          </FormControl>

          {fields.map((item, index) => (
            <Flex key={item.id}>
              <Controller
                render={({ field }) => (
                  <Input
                    id={`advancedPurpose${index}`}
                    variant="filled"
                    placeholder={`学びたいことその${index + 4}`}
                    {...field}
                  />
                )}
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
          <Button
            type="button"
            colorScheme="gray"
            onClick={addField}
            size="sm"
            placeSelf={'center'}
            isDisabled={purposeCount < 3}
          >
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
