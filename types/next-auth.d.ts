import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email?: string;
  }
}
