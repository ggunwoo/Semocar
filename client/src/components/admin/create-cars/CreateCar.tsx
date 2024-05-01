import { Link, Outlet } from "react-router-dom";

export default function CreateCarPage() {

  const serverUrl = process.env.LOCAL_SERVER_URL

  const handleSubmit = async (event: any) => {
    event.preventDefault();
  }

  return (
    <article>
      <nav className="flax justify-evenly mx-8">
        <Link to="gs-dz-lpg" className="mr-4 text-gray-500 hover:text-sky-400" >엔진차</Link>
        <Link to="electiric" className="text-gray-500 hover:text-sky-400" >전기차</Link>
      </nav>
      <Outlet />
    </article>
  );
}
