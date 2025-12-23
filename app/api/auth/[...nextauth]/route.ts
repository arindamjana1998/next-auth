import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthApis } from "@/services/api/auth.api";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // session: {
  //   strategy: "jwt", //  REQUIRED
  // },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
        type: { label: "Type", type: "text" }, // LOGIN | SIGN_UP
        role: { label: "Role", type: "text" },
      },

      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Username and password required");
        }

        const { username, email, password, type, role } = credentials;

        //  SIGN UP
        if (type === "SIGN_UP") {
          const signup = await AuthApis.signupUser({
            username,
            email,
            password,
            roles: role ? [role] : [],
          });

          if (!signup?.success) {
            throw new Error(signup?.message || "Signup failed");
          }
        }

        //  LOGIN
        const login = await AuthApis.loginUser({ username, password });

        if (!login?.success) {
          throw new Error(login?.message || "Invalid credentials");
        }

        const data = login.data;
        const user = data?.user ?? data;

        if (!user) {
          throw new Error("Invalid user data");
        }

        const apiToken = data?.access_token || data?.jwtToken;
        let expiresIn = data?.expiresIn;

        // Fallback: Decode token to get expiresIn if not provided in top-level data
        if (!expiresIn && apiToken) {
          try {
            const payload = JSON.parse(
              Buffer.from(apiToken.split(".")[1], "base64").toString()
            );
            if (payload.exp) {
              expiresIn = payload.exp - Math.floor(Date.now() / 1000);
            }
          } catch (e) {
            console.error("Failed to decode apiToken for expiry:", e);
          }
        }

        let absoluteExp = undefined;
        if (expiresIn) {
          absoluteExp = Math.floor(Date.now() / 1000) + expiresIn;
        }

        return {
          id: user._id || user.id,
          name: user.username,
          email: user.email,
          roles: user.roles || [],
          apiToken: apiToken,
          expiresIn: expiresIn,
          absoluteExp: absoluteExp,
        };
      },
    }),
  ],

  callbacks: {
    //  STORE DATA IN JWT (PERSIST ON RELOAD)
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.roles = user.roles || [];
        token.apiToken = user.apiToken;
        token.expiresIn = user.expiresIn;
        token.absoluteExp = user.absoluteExp;
      }

      // Forcefully set token.exp to our absoluteExp on every call
      if (token.absoluteExp) {
        token.exp = token.absoluteExp as number;
      }
      return token;
    },

    // RESTORE DATA INTO SESSION
    async session({ session, token }) {
      session.user = {
        name: token.name,
        roles: (token.roles as string[]) || [],
        apiToken: token.apiToken,
      };

      // Sync session.expires with our absoluteExp
      if (token.absoluteExp) {
        session.expires = new Date(
          (token.absoluteExp as number) * 1000
        ).toISOString();
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
