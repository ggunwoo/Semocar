import { Outlet } from "react-router-dom";

export default function CreateCarPage() {

  const serverUrl = process.env.LOCAL_SERVER_URL

  const handleSubmit = async (event: any) => {
    event.preventDefault();
  }

  return (
    <article>
      <Outlet />
    </article>
  );
}
