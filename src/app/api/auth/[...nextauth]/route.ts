import { authOptions } from "@/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions); //import authOptions
export { handler as GET, handler as POST };
