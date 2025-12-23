import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AuthApis } from "./services/api/auth.api";

export const config = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
        type: { label: "Type", type: "text" }, // LOGIN | SIGN_UP
        role: { label: "Role", type: "text" },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Username and password required");
        }

        const { username, password, email, type, role } = credentials;
        //  LOGIN
        const login = await AuthApis.loginUser({
          username: String(username),
          password: String(password),
        });

        if (!login?.success) {
          throw new Error(login?.message || "Invalid credentials");
        }

        const data = login.data;
        const user = data?.user ?? data;

        if (!user) {
          throw new Error("Invalid user data");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
