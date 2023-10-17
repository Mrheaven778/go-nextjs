async function getProjects() {
  const res = await fetch(`http://localhost:8080/users`, { cache: 'no-store' })
  const users = await res.json()
 
  return users
}
 
export default async function Dashboard() {
  const users = await getProjects()
 
  return (
    <main>
      <div className="flex flex-col items-center gap-11">
      <h1 className="text-stone-200 text-5xl font-extrabold">Los usuarios</h1> 
      <div className="grid gap-8 grid-cols-2 lg:gap-5 lg:grid-cols-3">
      {users.map((user) => (
        <div key={user.ID} className="rounded-lg border shadow-md bg-slate-900 border-slate-800 hover:scale-105 hover:bg-slate-700 hover:border-gray-500 transition flex flex-col p-11 items-center justify-between">
          <h2>{user.lastname}</h2>
          <h3 className="mb-2">{user.email}</h3>
          <a href={`/users/${user.ID}`} className="flex-row justify-center  text-white cursor-pointer hover:bg-violet-950 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2 hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-110 scale-90 gap-x-2 opacity-90 hover:opacity-100"  >
              Ver las tareas de {user && user.lastname}
            </a>
        </div>
      ))}
      </div>
      </div>
    </main>
  )
}