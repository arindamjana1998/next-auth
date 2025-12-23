import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      roles: string[];
      apiToken?: string;
    };
  }

  interface User {
    roles: string[];
    apiToken?: string;
    expiresIn?: number;
    absoluteExp?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    roles: string[];
    apiToken?: string;
    expiresIn?: number;
    absoluteExp?: number;
  }
}
