import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { update, remove } from '../../store/modules/register';

const Book = ({ id, title, toggleEdit }) => {
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

  if (editing) {
    return (
      <li>
        <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
        <button onClick={edit}>完了する</button>
      </li>
    );
  } else {
    return (
      <li>
        {editText}
        <button onClick={toggleEdit}>編集する</button>
        <button onClick={deleteBook}>削除する</button>
      </li>
    );
  }
};

export default Book;
