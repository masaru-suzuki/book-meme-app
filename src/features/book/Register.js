import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from './store/modules/register';
import { nanoid } from 'nanoid';

const initialInfo = {
  id: nanoid(),
  title: '',
};

const Register = () => {
  const [newBook, setNewBook] = useState(initialInfo);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const newBookInfo = { ...newBook };
    newBookInfo.title = e.target.value;
    setNewBook(newBookInfo);
  };

  const initField = () => {
    // idにランダムな値を登録(新たにnanoid()を呼ばないと、idが更新されず、重複する)
    initialInfo.id = nanoid();
    setNewBook(initialInfo);
  };

  const registerBook = (e) => {
    e.preventDefault();
    if (newBook.title === '') return;
    // TODO: 登録ボタンのdisabled切り替え機能

    dispatch(add(newBook));
    initField();
  };

  return (
    <form onSubmit={registerBook}>
      <input type="text" onChange={handleInputChange} value={newBook.title} />
      <button type="submit">登録する</button>
    </form>
  );
};

export default Register;
