"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FaRegUser } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const UserDropDown = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

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
          onClick={() => signOut({ callbackUrl: "/signin" })}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
