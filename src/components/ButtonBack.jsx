import { Box, Button } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';

export const ButtonBack = ({ label, cb }) => {
  return (
    <Box position="fixed" top="48px" left="0" right="0" bgColor={'white'} w={'calc(100% + 32px)'} p={2} zIndex={100}>
      <Button onClick={cb} leftIcon={<ChevronLeftIcon />} colorScheme="linkedin" variant="ghost" size="xs" pl={0}>
        {label}
      </Button>
    </Box>
  );
};
