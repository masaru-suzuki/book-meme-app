import { ButtonBack } from '../../components/ButtonBack';

const RandomRoot = ({ backToTop }) => {
  return (
    <>
      <ButtonBack label="TOP" cb={backToTop} />
      <h2>Random Quiz Page</h2>
    </>
  );
};

export default RandomRoot;
