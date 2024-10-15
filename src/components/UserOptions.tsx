import { Cloud, Github, LifeBuoy, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { getServerAuthSession } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

const UserOptions = async () => {
  const session = await getServerAuthSession();
  console.log(session);

  if (!session) {
    null;
  }

  return (
    <HydrateClient>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={session!.user?.image!} alt="@shadcn" />
              <AvatarFallback>CC</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <Cloud className="mr-2 h-4 w-4" />
                  <p>Dashboard</p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <p>Profile</p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <p>Settings</p>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <span>
                <Github className="mr-2 h-4 w-4" />
                <p>GitHub</p>
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <span>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <p>Support</p>
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/api/auth/signout">
                <LogOut className="mr-2 h-4 w-4" />
                <p>Sign out</p>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </HydrateClient>
  );
};

export default UserOptions;
