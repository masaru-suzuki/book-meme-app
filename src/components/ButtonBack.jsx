import { Button } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';

export const ButtonBack = ({ label, cb }) => {
  return (
    <Button onClick={cb} leftIcon={<ChevronLeftIcon />} colorScheme="linkedin" variant="ghost" size="xs" pl={0}>
      {label}
    </Button>
  );
};
