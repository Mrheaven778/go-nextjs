import React from "react";

function Header() {
  return (
    <header className="py-8 px-4 mx-auto max-w-xl lg:py-16 lg:px-6">
      <div className="mx-auto text-center mb-8 lg:mb-16">
        <h2 className="mb-4 text-5xl tracking-tight font-extrabold">
          Usuarios y tareas
        </h2>
        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
          Toda la informacion sobre las tareas
        </p>
      </div>
      <nav className="flex flex-col items-center w-full text-center md:flex-row justify-between gap-6">
        <a
          href="/"
          className="bg-gradient-to-r from-violet-700 to-indigo-900 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 "
        >
          Ver todos los usuarios
        </a>
      
        <a
          href="/tasks"
          className="bg-gradient-to-r from-violet-700 to-indigo-900 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 "
        >
          Ver todas las tareas
        </a>
           <a
          href="/users"
          className="bg-gradient-to-r from-violet-700 to-indigo-900 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 "
        >
          Crear usuario
        </a>
      </nav>
    </header>
  );
}

export default Header;
