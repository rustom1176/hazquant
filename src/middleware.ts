export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: ["/dashboard/:path*", "/projects/:path*", "/assessments/:path*", "/reports/:path*", "/admin/:path*", "/my-account/:path*"],
};
