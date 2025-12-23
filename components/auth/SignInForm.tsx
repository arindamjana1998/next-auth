"use client";
import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const SignInForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        type: "LOGIN",
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        const session = await getSession();
        const roles = session?.user?.roles || [];

        if (roles.includes("ROLE_ADMIN")) {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
        toast.success("Sign in successful");
      }
    } catch (err) {
      toast.error("An error occurred during sign in");
    }
  };
  return (
    <form className="flex w-full flex-col items-center" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="my-2 w-full bg-[#eee] px-4 py-3 text-sm outline-none border-none"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="my-2 w-full bg-[#eee] px-4 py-3 text-sm outline-none border-none"
      />
      <button className="rounded-[40px] border border-[#ff4b2b] bg-[#ff4b2b] px-12 py-3 text-xs font-bold uppercase tracking-wider text-white transition-transform duration-80 active:scale-95 focus:outline-none ">
        Log In
      </button>
    </form>
  );
};

export default SignInForm;
