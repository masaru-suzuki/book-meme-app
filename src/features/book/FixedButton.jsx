import { Stack, IconButton, Icon } from '@chakra-ui/react';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { BiListPlus } from 'react-icons/bi';
import { HiOutlineTrash } from 'react-icons/hi';

const CustomListIcon = () => <Icon as={BiListPlus} width="24px" height="24px" opacity="0.8" />;
const CustomBookIcon = () => <Icon as={MdOutlineModeEditOutline} width="24px" height="24px" opacity="0.8" />;
const CustomTrashIcon = () => <Icon as={HiOutlineTrash} width="5" height="5" opacity="0.8" />;

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
