import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen content-center items-center justify-center">
      <div className="flex flex-col">
        <p>Looks like you have lost your way.</p>
        <p>No problem. We got you covered.</p>
        <div>
          <Button>
            <Link href={"/"}>Explore the Website</Link>
          </Button>
          <Button>
            <Link href="/about">Learn more about us.</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
