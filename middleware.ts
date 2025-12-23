export const config = {
  matcher: ["/dashboard/:path*"],
};

export { auth as middleware } from "@/auth";
