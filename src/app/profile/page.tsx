import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const page = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  const hello = await api.budget.getAll();

  if (hello.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {hello.map((a) => {
        return <div>{a.name}</div>;
      })}
    </div>
  );
};

export default page;
