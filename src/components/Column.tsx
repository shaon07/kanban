import React, { useState } from 'react';
import { Todo } from '../App';
import TodoItem from './TodoItem';

interface ColumnProps {
  title: string;
  todos: Todo[];
  addTodo?: (title: string, description: string) => void;
  moveTodo: (id: number, newStatus: 'new' | 'ongoing' | 'done') => void;
}

const Column: React.FC<ColumnProps> = ({ title, todos, addTodo, moveTodo }) => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [newTodoDescription, setNewTodoDescription] = useState<string>('');

  const handleAddTodo = () => {
    if (addTodo) {
      addTodo(newTodoTitle, newTodoDescription);
      setNewTodoTitle('');
      setNewTodoDescription('');
    }
  };

  return (
    <div className="w-full md:w-1/3 p-2">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      {title === 'New' && (
        <div className="mb-4">
          <input
            type="text"
            className="border p-2 w-full mb-2"
            placeholder="Title"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
          <textarea
            className="border p-2 w-full mb-2"
            placeholder="Description"
            value={newTodoDescription}
            onChange={(e) => setNewTodoDescription(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2" onClick={handleAddTodo}>
            Add Todo
          </button>
        </div>
      )}
      <div>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} moveTodo={moveTodo} />
        ))}
      </div>
    </div>
  );
};

export default Column;
