import { ButtonBack } from '../../components/ButtonBack';

const BookAdd = ({ backToTop }) => {
  return (
    <>
      <ButtonBack label="TOP" cb={backToTop} />
      <p>book add</p>
    </>
  );
};

export default BookAdd;
