import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prismadb from "../libs/prismadb";
import bcrypt from 'bcrypt';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { stripe } from "./stripe";



export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismadb),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prismadb.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.id || !user.hashedPssword) { // Corrected the typo here
          throw new Error("Invalid credentials");
        }

        const correctPassword = await bcrypt.compare(credentials.password, user.hashedPssword);

        if (!correctPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  events: {
    createUser: async (message)=> {
    const userId = message.user.id;
    const email = message.user.email;
    const name = message.user.name;

    if (!userId || !email) {
    return;
    }
    const stripeCustomer = await stripe.customers.create({
    email,
    name:name ?? undefined
    });
    await prisma?.user.update({
      where:{
        id:userId,
      },
      data:{
        stripeCustomerId:stripeCustomer.id,
      },
    })
  },
},
  debug: process.env.NODE_ENV !== "production",
  
};

