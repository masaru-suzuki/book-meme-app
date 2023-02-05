import { ButtonBack } from '../../components/ButtonBack';
import FormAdd from './FormAdd';

const BookAdd = ({ backToTop }) => {
  return (
    <>
      <ButtonBack label="TOP" cb={backToTop} />
      <FormAdd />
    </>
  );
};

export default BookAdd;
