import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [currentDescription, setCurrentDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempDescription, setTempDescription] = useState('');

  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:3001/todos");
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (!text) return;
    await axios.post("http://localhost:3001/todos", { text });
    fetchTodos();
    setText("");
  };

  const toggleCompletion = async (id, isCompleted) => {
    await axios.put(`http://localhost:3001/todos/${id}`, {
      isCompleted: !isCompleted,
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:3001/todos/${id}`);
    fetchTodos();
  };

  const handleDescription = (desc) => {
    // Cette fonction pourrait être utilisée pour gérer la description de la tâche
    setDescription(desc);
  };
  const handleTaskClick = (e, todo) => {
    e.preventDefault();
    setCurrentTaskId(todo._id);
    setCurrentDescription(todo.description);
    setTempDescription(todo.description); // Initialise tempDescription avec la description actuelle
    setIsEditing(false); // Réinitialiser l'état d'édition
    setIsContextMenuVisible(true);
    setContextMenuPosition({
      x: e.clientX,
      y: e.clientY
    });
  };
  
  const closeContextMenu = () => {
    setIsContextMenuVisible(false);
  };
  const updateDescription = async (taskId, description) => {
    try {
      await axios.put(`http://localhost:3001/todos/${taskId}/description`, { description });
      fetchTodos(); // Mettre à jour la liste des tâches pour refléter la nouvelle description
      setCurrentDescription(description); // Mettre à jour la description actuelle
      setIsContextMenuVisible(false); // Fermer le menu contextuel
    } catch (error) {
      console.error('Error updating description:', error);
    }
  };
  
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-xl font-bold text-center mb-4">Ma Todo List</h1>
        <div className="mb-4 flex">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ajouter une tâche..."
            className="shadow appearance-none border rounded-l py-2 px-3 text-gray-700 leading-tight w-full focus:outline-none focus:shadow-outline"
          />
          <button
            onClick={addTodo}
            className="bg-black hover:bg-black/80 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
          >
            Ajouter
          </button>
        </div>
        <ul className="mb-4">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center justify-between mb-2 bg-white shadow px-4 py-2 rounded"
            >
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => toggleCompletion(todo._id, todo.isCompleted)}
                className="mr-2"
              />
              <span
                className={`flex-1 text-sm ${
                  todo.isCompleted
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                }`}
                onClick={(e) => handleTaskClick(e, todo._id)}
                style={{ cursor: "pointer" }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                <FaRegTrashAlt />
              </button>
            </li>
          ))}
        </ul>
      </div>
      {
  isContextMenuVisible &&
  <div
    className="absolute bg-white shadow-lg rounded p-4 context-menu"
    style={{ top: `${contextMenuPosition.y}px`, left: `${contextMenuPosition.x}px` }}
  >
    <span className="cursor-pointer" onClick={closeContextMenu}>x</span>
    <p className="text-gray-700 font-bold mb-2">{todos.find(todo => todo._id === currentTaskId)?.text}</p>
    <input
      type="text"
      value={tempDescription}
      onChange={(e) => {
        setTempDescription(e.target.value);
        setIsEditing(e.target.value !== currentDescription);
      }}
      className="text-sm p-1 border border-gray-300 rounded w-full"
    />
    {isEditing && (
      <button
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm w-full"
        onClick={() => {
          updateDescription(currentTaskId, tempDescription);
          setIsEditing(false);
        }}
      >
        Enregistrer
      </button>
    )}
  </div>
}


  
    </div>
  );
};

export default TodoApp;
