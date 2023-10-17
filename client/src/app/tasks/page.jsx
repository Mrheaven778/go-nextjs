import React from "react";

async function getTasks() {
  const res = await fetch("http://localhost:8080/tasks", {
    cache: "no-store",
  });
  const tasks = await res.json();
  return tasks;
};

export default async function page() {
  const tasks = await getTasks();
  return (
    
    <div className="flex flex-col items-center gap-11">
      <h1 className="text-stone-200 text-5xl font-extrabold">Tosdas las tareas</h1> 
      <div className="grid gap-8 grid-cols-1 lg:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <a href={`/users/${task.user_id}`}>
          <div key={task.ID} className="rounded-lg border shadow-md bg-slate-900 border-slate-800 hover:scale-105 hover:bg-slate-700 hover:border-gray-500 transition flex flex-col p-11 items-center justify-between">
            <h2> Esta tarea pertenede al usuario: {task.user_id}</h2>
            <h2>{task.title}</h2>
            <h3 className="mb-2">{task.description}</h3>
            {task.Done ? (<p>Tarea realizada</p>): (<p>Tarea pendiente</p>)}
          </div>
          </a>
        ))}
      </div>
    </div>
  );
}