import React, { useState } from 'react';

const TodoItem = ({ todo, moveTodo }) => {
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 16)); // Default to current date and time
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const statusColors = {
    new: 'bg-blue-200',
    ongoing: 'bg-orange-200',
    done: 'bg-green-200',
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowMenu(true);
    setMenuPosition({ x: e.pageX, y: e.pageY });
  };

  const handleMove = (newStatus) => {
    moveTodo(todo.id, newStatus);
    setShowMenu(false);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <div className={`p-4 mb-2 ${statusColors[todo.status]}`} onContextMenu={handleContextMenu}>
      <h3 className="font-bold">{todo.title}</h3>
      <p>{todo.description}</p>
      {todo.status === 'ongoing' && (
        <div className="mt-2">
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          {new Date(dueDate) < new Date() && <p className="text-red-500">Task is overdue!</p>}
        </div>
      )}
      {showMenu && (
        <div
          className="absolute bg-white border shadow-lg"
          style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
          onMouseLeave={closeMenu}
        >
          {todo.status !== 'new' && <div className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleMove('new')}>Move to New</div>}
          {todo.status !== 'ongoing' && <div className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleMove('ongoing')}>Move to Ongoing</div>}
          {todo.status !== 'done' && <div className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleMove('done')}>Move to Done</div>}
        </div>
      )}
    </div>
  );
};

export default TodoItem;
