import { useSelector } from 'react-redux';
import { ButtonBack } from '../../components/ButtonBack';

const RandomRoot = ({ backToTop }) => {
  const { status, quizList } = useSelector((state) => state.quiz);
  console.log(status);
  return (
    <>
      <ButtonBack label="TOP" cb={backToTop} />
      <h2>Random Quiz Page</h2>
    </>
  );
};

export default RandomRoot;
