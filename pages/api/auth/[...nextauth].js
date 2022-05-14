import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
  },
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    // redirect({ url, baseUrl }) {
    //   return url;
    // },
  },
});
