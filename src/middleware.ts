import { authMiddleware,redirectToSignIn } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: ["/", "/sign-in","/sign-up","/forgot-password","/reset-password"],

});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};