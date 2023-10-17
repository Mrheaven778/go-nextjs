"use client"

import React from "react";

function ShowTasks({ tasks }) {
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:8080/tasks/${id}`,{
      method: "DELETE"
    })

    // Agrega la lógica para eliminar la tarea aquí
  };

  return (
    <div className="mt-4">
      <h4 className="text-2xl font-bold mb-2">Tareas:</h4>

      <div className="flex flex-col gap-5">
        {tasks.map((task) => (
          <div className="flex items-center justify-between" key={task.ID}>
            <p className="font-extrabold text-lg">
              {task.title}{" "}
              <span className="font-normal">
                Descripcion: {task.description}
              </span>
            </p>
            <form action="">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 border rounded ml-2"
              onClick={ async () =>  {await deleteTask(task.ID)}}
            >
              Eliminar tarea
            </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowTasks;

