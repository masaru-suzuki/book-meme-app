import { Stack, IconButton, Icon } from '@chakra-ui/react';
import { BiListPlus } from 'react-icons/bi';

const CustomListIcon = () => <Icon as={BiListPlus} width="24px" height="24px" opacity="0.8" />;

const FixedButton = ({ setBookFlag }) => {
  return (
    <Stack position="fixed" bottom="5" right="5" direction="column" spacing={2} align="center">
      <IconButton
        borderRadius="100%"
        w={14}
        h={14}
        aria-label="Search database"
        colorScheme={'gray'}
        icon={<CustomListIcon />}
        onClick={() => setBookFlag('memoAdd')}
      />
    </Stack>
  );
};

export default FixedButton;
