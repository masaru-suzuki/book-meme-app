import { ButtonBack } from '../../components/ButtonBack';

const Top = ({ backToTop }) => {
  return (
    <>
      <ButtonBack label="TOP" cb={backToTop} />
      <h1>memo add</h1>
    </>
  );
};

export default Top;
