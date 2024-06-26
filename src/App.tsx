import React, { useState } from 'react';
import Column from './components/Column';
import './App.css';

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: 'new' | 'ongoing' | 'done';
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: 'Admin Panel Test Cases', description: '', status: 'new' },
    { id: 2, title: 'Seller Panel Test Cases', description: '', status: 'new' },
    { id: 3, title: 'Sales Manager Panel', description: '', status: 'new' },
    { id: 4, title: 'Customer Support & Operations', description: '', status: 'new' },
    { id: 5, title: 'Shop Panel Test Cases', description: '', status: 'new' },
    { id: 6, title: 'Questions', description: '', status: 'ongoing' },
  ]);

  const addTodo = (title: string, description: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      status: 'new',
    };
    setTodos([newTodo, ...todos]);
  };

  const moveTodo = (id: number, newStatus: 'new' | 'ongoing' | 'done') => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, status: newStatus } : todo)));
  };

  return (
    <div className="flex flex-col md:flex-row justify-around p-4">
      <Column title="New" todos={todos.filter(todo => todo.status === 'new')} addTodo={addTodo} moveTodo={moveTodo} />
      <Column title="Ongoing" todos={todos.filter(todo => todo.status === 'ongoing')} moveTodo={moveTodo} />
      <Column title="Done" todos={todos.filter(todo => todo.status === 'done')} moveTodo={moveTodo} />
    </div>
  );
};

export default App;
