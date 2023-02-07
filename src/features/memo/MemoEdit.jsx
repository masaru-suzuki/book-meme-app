import { ButtonBack } from '../../components/ButtonBack';

const MemoEdit = ({ book, backToMemoRoot }) => {
  return (
    <>
      <ButtonBack label="BACK" cb={backToMemoRoot} />
      <h2>memo edit</h2>
      <p>{book.title}</p>
    </>
  );
};

export default MemoEdit;
