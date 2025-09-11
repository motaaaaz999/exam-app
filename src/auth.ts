import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    //Auth pages
    signIn: "/login",
  },

  providers: [
    //credentials
    Credentials({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      //authorize function
      authorize: async (credentails) => {
        const response = await fetch(
          "https://exam.elevateegy.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify({
              email: credentails?.email,
              password: credentails?.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const payload: ApiResponse<LoginResponse> = await response.json();
        //handle the error message from backend
        if ("code" in payload) {
          throw new Error(payload.message);
        }

        // id must be returned in authorize()
        return {
          id: payload.user._id,
          accessToken: payload.token,
          ...payload.user,
        };
      },
    }),
  ],

  //callbacks functions
  callbacks: {
    //jwt function
    jwt: ({ token, user }) => {
      //NOTE user => token
      if (user) {
        token = { ...user };
      }
      console.log("moataz token", token);
      return token;
    },

    //session function
    //NOTE token => session
    session: ({ session, token }) => {
      session._id = token._id;
      session.email = token.email || "";
      session.username = token.username;
      session.phone = token.phone;
      session.firstName = token.firstName;
      session.lastName = token.lastName;
      session.role = token.role;

      console.log("session", session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
