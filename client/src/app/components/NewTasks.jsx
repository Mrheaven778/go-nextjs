"use client"

import React, { useState } from 'react';

function NewTasks({ user_id }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError('Los dos campos son obligarios');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          user_id,
        }),
      });

      // Reset form and error state after successful submission
      setTitle('');
      setDescription('');
      setError('');
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center gap-y-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white p-8 rounded-lg shadow-lg lg:mx-566 mx-16 border bg-slate-900 border-slate-800 hover:scale-105 hover:bg-slate-700 hover:border-gray-500 transition mt-6">
      {error && <p className="text-red-500">{error}</p> }
      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-semibold mb-1">
            Titulo de la tarea
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="py-2 px-3 border rounded-md text-black font-semibold"
            placeholder='Titulo de la tarea'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-lg font-semibold mb-1">
            Descripcion de la tarea
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="py-2 px-3 border rounded-md text-black font-semibold"
            value={description}
            placeholder='Descripcion de la tarea'
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border rounded transition"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default NewTasks;
