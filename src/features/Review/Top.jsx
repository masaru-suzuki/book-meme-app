import { ButtonBack } from '../../components/ButtonBack';

const ReviewRoot = ({ backToTop }) => {
  return (
    <>
      <ButtonBack label="TOP" cb={backToTop} />
      <h2>Review Page</h2>
    </>
  );
};

export default ReviewRoot;
