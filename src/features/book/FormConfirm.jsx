import { FormLabel, VStack, StackDivider, Input, Grid, Box, Button } from '@chakra-ui/react';

const FormConfirm = ({ book, toggleEditMode }) => {
  // MEMO: 編集画面と共用にできればと思ったが、form のonSubmitによって送信してしまうため、使い回しできなかった。
  const { title, reason, purpose } = book;

  return (
    <>
      <form>
        <VStack divider={<StackDivider borderColor="gray.100" />} spacing={5} align="stretch">
          <Box>
            <FormLabel htmlFor="title" fontSize={'xs'} color="gray.700">
              タイトル
            </FormLabel>
            <Input id="title" variant="filled" placeholder="title" isReadOnly defaultValue={title} />
          </Box>
          <Box>
            <FormLabel htmlFor="reason" fontSize={'xs'} color="gray.700">
              何のためにこの本を読むのか
            </FormLabel>
            <Input id="reason" variant="filled" placeholder="reason" isReadOnly defaultValue={reason} />
          </Box>
          <Grid gap="3">
            <FormLabel htmlFor="purpose1" fontSize={'xs'} color="gray.700">
              この本から学びたいこと
            </FormLabel>

            {purpose?.map((item, index) => {
              return (
                <Box key={item + index}>
                  <Input
                    id={`purpose${index}`}
                    variant="filled"
                    placeholder={`学びたいことその${index + 1}`}
                    isReadOnly
                    defaultValue={item}
                  />
                </Box>
              );
            })}
          </Grid>
        </VStack>
      </form>
    </>
  );
};

export default FormConfirm;
