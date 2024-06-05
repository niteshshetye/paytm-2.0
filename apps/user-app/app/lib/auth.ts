import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@repo/db/client";

export const authOptions = {
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "Enter phone number",
          required: true,
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
          required: true,
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.password || !credentials?.phone) return null;

        const hashPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await db.user.findFirst({
          where: {
            number: credentials.phone,
          },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );

          return passwordValidation
            ? {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.number,
              }
            : null;
        }

        try {
          const user = await db.user.create({
            data: {
              number: credentials.phone,
              password: hashPassword,
              Balance: {
                create: {
                  amount: 0,
                  locked: 0,
                },
              },
            },
          });

          return {
            id: user.id,
            name: user.name,
            email: user.number,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    // TODO: can u fix the type here? Using any is bad
    async session({ token, session }: any) {
      session.user.id = token.sub;

      return session;
    },
  },
};
