import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import UserOptions from "./UserOptions";

const Navbar = async () => {
  const session = await getServerAuthSession();
  return (
    <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white bg-opacity-30 backdrop-blur-lg backdrop-filter">
      <div className="mx-2 flex h-16 items-center justify-between">
        <span className="text-2xl font-semibold text-gray-900">
          <Link href="/">Home</Link>
        </span>

        <div className="w-24">
          <Link href="/about">About</Link>
        </div>

        <div className="flex flex-col items-center justify-center gap-4">
          {session ? (
            <UserOptions />
          ) : (
            <Link
              href="/api/auth/signin"
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
