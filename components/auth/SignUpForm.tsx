"use client";
import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

const SignUpForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters and include uppercase, lowercase, number, and special character."
      );
      return;
    }
    try {
      const result = await signIn("credentials", {
        type: "SIGN_UP",
        username,
        email,
        password,
        roles: [role],
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
        toast.success("Sign up successful");
      }
    } catch (err) {
      toast.error("An error occurred during sign up");
    }
  };
  return (
    <form className="flex w-full flex-col items-center" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="my-2 w-full bg-[#eee] px-4 py-3 text-sm outline-none border-none"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="my-2 w-full bg-[#eee] px-4 py-3 text-sm outline-none border-none"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="my-2 w-full bg-[#eee] px-4 py-3 text-sm outline-none border-none"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="my-2 w-full appearance-none bg-[#eee] px-4 py-3 text-sm outline-none border-none cursor-pointer"
      >
        <option value="user">User</option>
        <option value="moderator">Owner</option>
      </select>

      <button className="rounded-[40px] border border-[#ff4b2b] bg-[#ff4b2b] px-12 py-3 text-xs font-bold uppercase tracking-wider text-white transition-transform duration-80 active:scale-95 focus:outline-none">
        Register
      </button>
    </form>
  );
};

export default SignUpForm;
