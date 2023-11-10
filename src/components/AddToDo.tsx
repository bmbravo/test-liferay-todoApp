import { useState } from 'react';
import { useToDos } from '../store/ToDoContext';

const AddToDo = () => {
  const { handleAddToDo } = useToDos();
  const [toDo, setToDo] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddToDo(toDo);
    setToDo('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={toDo}
        onChange={(e) => setToDo(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddToDo;
