"use client";
import React, { useState } from "react";
import Link from "next/link";

function NewUser() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (!firstname || !lastname || !email) {
      setError("Los campos nombre email y descripcion son obligatorias ");
      return;
    }
    const res = await fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
      }),
    });
    setEmail("");
    setLastname("");
    setFirstname("");
  };
  return (
    <div className="flex flex-col items-center justify-center gap-y-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white p-8 rounded-lg shadow-lg lg:mx-566 mx-16 border bg-slate-900 border-slate-800 hover:scale-105 hover:bg-slate-700 hover:border-gray-500 transition mt-6">
      {error && <p className="text-red-500">{error}</p>}
      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="firstname" className="text-lg mb-1 font-semibold">
            Nombre del usuario
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            className=" py-2 px-3 border rounded-md text-black font-semibold"
            value={firstname}
            placeholder="Nombre"
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="firstname" className="text-lg mb-1 font-semibold">
            Apellido del usuario
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            className=" py-2 px-3 border rounded-md text-black font-semibold"
            placeholder="Apellido"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg mb-1 font-semibold">
            Email del usuario
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            className=" py-2 px-3 border rounded-md text-black font-semibold"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border rounded transition w-full"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default NewUser;
