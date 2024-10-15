import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-grow content-center items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <p>Looks like you have lost your way.</p>
          <p>No problem. We got you covered.</p>
          <div className="mt-4 space-x-4">
            <Button asChild>
              <Link href="/">Explore the Website</Link>
            </Button>
            <Button asChild>
              <Link href="/about">Learn more about us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
