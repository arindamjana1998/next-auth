"use client";

import Link from "next/link";
import { FaRegUser } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { auth, signOut } from "@/auth";

const UserDropDown = async () => {
  const router = useRouter();
  const session = await auth();
  const user = session?.user;
  if (!user) return null;

  const firstChar = user?.name?.charAt(0).toUpperCase();
  const roles = user?.roles || [];

  const isAdmin = roles.includes("ROLE_ADMIN");

  if (!user) {
    return (
      <Link
        href="/signin"
        className="text-white text-xl rounded-full border border-white p-2 hover:bg-white hover:text-[var(--navy)] transition-colors cursor-pointer"
      >
        <FaRegUser />
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-10 w-10 rounded-full border border-white text-white flex items-center justify-center font-semibold hover:bg-white hover:text-[var(--navy)] transition-colors cursor-pointer">
          {firstChar}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        {isAdmin && (
          <>
            <DropdownMenuItem
              className="cursor-pointer text-grey-600 focus:text-grey-600"
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-grey-600 focus:text-grey-600"
              onClick={() => router.push("/dashboard/add-room")}
            >
              Add Room
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600"
          onClick={() => signOut()}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
