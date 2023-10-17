import DeleteUser from "@/app/components/DeleteUser";
import NewTasks from "@/app/components/NewTasks";
import ShowTaks from "@/app/components/ShowTaks";

async function getUser(id) {
  const res = await fetch(`http://localhost:8080/users/${id}`, {
    cache: "no-cache",
  });
  const user = await res.json();
  return user;
}

async function UserProps({ params }) {
  const { id } = params;
  const user = await getUser(id);
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-y-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white p-5 rounded-lg shadow-lg lg:mx-566 mx-16  border  bg-slate-900 border-slate-800 hover:scale-105 hover:bg-slate-700 hover:border-gray-500 transition" >
        <div className="flex md:flex-row gap-3 items-center flex-col">
          <h3 className="text-4xl font-extrabold">{user.firstname}</h3>
          <h3 className="text-4xl font-extrabold">{user.lastname}</h3>
          <p className="text-lg">{user.email}</p>
          <DeleteUser user={user} />
        </div>
        <ShowTaks tasks={user.tasks} />
      </div>
      <NewTasks user_id={user.ID} />
    </div>
  );
}

export default UserProps;
