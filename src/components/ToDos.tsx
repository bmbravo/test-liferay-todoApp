import { useToDos } from '../store/ToDoContext';
import { useSearchParams } from 'react-router-dom';

const ToDos = () => {
  const { TODO, handleToggleToDo, deleteToDo, deleteAll } = useToDos();

  const [searchParams] = useSearchParams();
  const todosData = searchParams.get('todos');

  let filterToDo = TODO;

  if (todosData === 'active') {
    filterToDo = filterToDo.filter((todo) => !todo.completed);
  }
  if (todosData === 'completed') {
    filterToDo = filterToDo.filter((todo) => todo.completed);
  }

  return (
    <>
      <ul className="main-task">
        {filterToDo.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onChange={() => {
                  handleToggleToDo(todo.id);
                }}
              />
              <label htmlFor={`todo-${todo.id}`}> {todo.task}</label>
              {todo.completed && (
                <button
                  onClick={() => {
                    deleteToDo(todo.id);
                  }}
                >
                  Delete
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {filterToDo.length > 0 && (
        <button id="deleteAll" onClick={deleteAll}>
          Delete All
        </button>
      )}
    </>
  );
};

export default ToDos;
