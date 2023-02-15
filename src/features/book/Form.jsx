import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import FormEdit from './FormEdit';
import FormConfirm from './FormConfirm';

const Form = ({ book }) => {
  const [isEdit, setIsEdit] = useState(false);
  const toggleEditMode = () => setIsEdit((prev) => !prev);

  return (
    <Box>
      {isEdit ? (
        <FormEdit book={book} toggleEditMode={toggleEditMode} />
      ) : (
        <FormConfirm book={book} toggleEditMode={toggleEditMode} />
      )}
    </Box>
  );
};

export default Form;
