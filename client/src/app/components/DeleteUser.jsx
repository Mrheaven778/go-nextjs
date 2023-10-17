"use client"

import Link from "next/link";
import React from "react";

async function DeleteUser(user) {
  
  console.log(user)
  const taks = user.tasks
  
  

  const deleteUser = async () => {
    const res = await fetch(`http://localhost:8080/users/${user.ID}`, {
      method: "DELETE",
    });

    // Utiliza Promise.all para esperar a que todas las eliminaciones de tareas se completen
    // await Promise.all(taks.map(async (task) => {
      
    //   console.log(task.ID)
    //   const deleteTask = await fetch(`http://localhost:8080/tasks/${task.ID}`, {
    //     method: "DELETE",
    //   });
    // }));
  }

  return (
    <Link href="/">
      <button
        type="submit"
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 border rounded ml-2"
        onClick={async () => await deleteUser()}
      >
        Eliminar Usuario
      </button>
    </Link>
  );
}

export default DeleteUser;


