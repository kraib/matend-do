import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/",
    "/history",
    "/profile",
    "/settings",
    "/((?!api|login|_next/static|_next/image|favicon.ico).*)",
  ],
};