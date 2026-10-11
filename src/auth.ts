import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// AUTH_SECRET, AUTH_GOOGLE_ID и AUTH_GOOGLE_SECRET читаются из окружения.
export const { handlers, auth } = NextAuth({
  providers: [Google],
  session: { strategy: "jwt" },
});
