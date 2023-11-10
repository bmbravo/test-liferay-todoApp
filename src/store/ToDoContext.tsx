import { useState, useContext } from 'react';
import todosContext from './toDo';

// type of React Prop
export type reactProp = {
  children: React.ReactNode;
};

// type of ToDo
export type ToDo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

// Type of ToDO context
export type TODOContext = {
  TODO: ToDo[];
  handleAddToDo: (task: string) => void;
  handleToggleToDo: (id: string) => void;
  deleteToDo: (id: string) => void;
  deleteAll(): void;
};

const ToDoContext = ({ children }: reactProp) => {
  const [TODO, setTODO] = useState<ToDo[]>(() => {
    const data = localStorage.getItem('todos') || '[]';
    return JSON.parse(data);
  });

  const handleAddToDo = (task: string) => {
    setTODO((prev) => {
      const newTodos: ToDo[] = [
        {
          id: Math.random().toString(),
          task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return newTodos;
    });
  };

  const handleToggleToDo = (id: string) => {
    setTODO((prev) => {
      const newTodos = prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return newTodos;
    });
  };

  const deleteToDo = (id: string) => {
    setTODO((prev) => {
      const newToDos = prev.filter((todo) => todo.id !== id);
      localStorage.setItem('todos', JSON.stringify(newToDos));
      return newToDos;
    });
  };

  const deleteAll = () => {
    setTODO([]);
    localStorage.removeItem('todos');
  };

  return (
    <todosContext.Provider
      value={{ TODO, handleAddToDo, handleToggleToDo, deleteToDo, deleteAll }}
    >
      {children}
    </todosContext.Provider>
  );
};

export default ToDoContext;

export const useToDos = () => {
  const todosConsumer = useContext(todosContext);
  if (!todosConsumer) {
    throw new Error('useTodos used outside of Provider');
  }
  return todosConsumer;
};
