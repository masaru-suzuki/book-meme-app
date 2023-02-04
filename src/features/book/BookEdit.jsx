import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { update, remove } from './store/modules/register';

const BookEdit = ({ book }) => {
  const { id, title } = book;
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(title);
  const dispatch = useDispatch();

  // TODO: 編集機能実装
  const edit = () => {
    console.log('edit');
    setEditing((prev) => !prev);
    dispatch(update({ id, title: editText }));
  };

  const deleteBook = () => {
    console.log('remove');
    dispatch(remove({ id }));
  };

  return <h2>edit : {title}</h2>;
};

export default BookEdit;
