import { useDispatch } from 'react-redux';
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form';
import { update } from './store/modules/register';
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

const FormEdit = ({ book, backToBookRoot }) => {
  const dispatch = useDispatch();
  const { id, title, reason, purpose } = book;

  // fallback
  // TODO: 書き方スマートになる？
  const advancedPurposeStatic = purpose === undefined || purpose.slice(3) === undefined ? [] : purpose.slice(3);
  console.log({ purpose });
  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values, e) {
    console.log(values);
    // TODO: 登録！みたいなFBあったらいいな。Chakra UIでできるかも
    // 空の場合は登録されないようにする
    const newPurpose = purpose.map((_, index) => values[`purpose${index}`]).filter((val) => val !== '');
    const advancedList = values.advancedPurpose.filter((val) => val !== '');

    console.log(newPurpose);
    const newBook = {
      id: id,
      title: values.title,
      reason: values.reason,
      purpose: [...newPurpose, ...advancedList],
    };
    console.log(newBook);

    // ロジック
    backToBookRoot();
    dispatch(update(newBook));
  }

  // Formの動的処理
  const { fields, append, remove } = useFieldArray({ control, name: 'advancedPurpose' });
  const watchPurposeArr = purpose.map((_, index) => `purpose${index}`);
  const watchPurpose = watch(watchPurposeArr);
  const watchAdvancedPurpose = watch('advancedPurpose');

  // 学びたいことを埋めた個数
  const [purposeCount, setPurposeCount] = useState(0);
  const [progressColor, setProgressColor] = useState('red.400');
  const [trackColor, setTrackColor] = useState('red.100');

  // 追加するボタン
  const addField = () => {
    append(['']);
  };

  // プログレスリングのロジック
  useEffect(() => {
    if (!watchAdvancedPurpose) return;
    const purposeCount = watchPurpose.filter((val) => val !== '').length;
    const advancedPurposeCount = watchAdvancedPurpose.filter((val) => val !== '').length;
    const filledField = purposeCount + advancedPurposeCount;
    setPurposeCount(filledField);
  }, [watchPurpose, watchAdvancedPurpose]);

  // プログレスバーの色
  useEffect(() => {
    switch (purposeCount) {
      case 0:
        setProgressColor('red.400');
        setTrackColor('red.400');
        break;
      case 1:
        setProgressColor('red.400');
        setTrackColor('red.100');
        break;
      case 2:
        setProgressColor('orange.400');
        setTrackColor('orange.100');
        break;
      default:
        setProgressColor('green.400');
        setTrackColor('green.100');
        break;
    }
  }, [watchPurpose]);

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
            {...register('reason', {
              required: '分かりそうなことは必須です',
            })}
          />
          <FormErrorMessage>{errors.reason && errors.reason.message}</FormErrorMessage>
        </FormControl>
        <Grid gap="3">
          <Flex justifyContent={'space-between'} alignItems="center" mb={'4'}>
            <FormLabel htmlFor="purpose1" fontSize={'xs'} color="gray.700">
              この本から学びたいこと
            </FormLabel>
            <CircularProgress
              value={(purposeCount * 100) / 3}
              color={progressColor}
              trackColor={trackColor}
              thickness="10px"
              size="32px"
            >
              <CircularProgressLabel>{`${purposeCount}/3`}</CircularProgressLabel>
            </CircularProgress>
          </Flex>
          {purpose.map((item, index) => {
            console.log(item);
            return (
              <FormControl key={item + index}>
                <Input
                  id={`purpose${index}`}
                  variant="filled"
                  placeholder={`学びたいことその${index + 1}`}
                  defaultValue={item}
                  {...register(`purpose${index}`)}
                />
              </FormControl>
            );
          })}
          {fields.map((item, index) => (
            <Flex key={item.id}>
              <Controller
                render={({ field }) => (
                  <Input
                    id={`advancedPurpose${index}`}
                    variant="filled"
                    placeholder={`学びたいことその${index + advancedPurposeStatic.length + 4}`}
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

        <Button mt={4} colorScheme="linkedin" isLoading={isSubmitting} isDisabled={purposeCount < 3} type="submit">
          登録する
        </Button>
      </VStack>
    </form>
  );
};

export default FormEdit;
