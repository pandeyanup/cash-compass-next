import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { hash } from "bcryptjs";

export const loginRouter = createTRPCRouter({
  loginRequest: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      if (!email || !password) {
        return "Please enter all data" as const;
      }

      const emailCheck = await ctx.db.account.findFirst({
        where: {
          email: email,
        },
      });

      if (!emailCheck) {
        throw new TRPCError({
          message: "Incorrect email or password entered.",
          code: "UNAUTHORIZED",
        });
      }
      console.log(emailCheck);

      return new TRPCError({
        message: "Incorrect email or password entered.",
        code: "UNAUTHORIZED",
      });
    }),

  createUserAccount: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      if (!email || !password) {
        return "Please enter all data" as const;
      }

      const emailCheck = await ctx.db.account.findFirst({
        where: {
          email: email,
        },
      });

      if (emailCheck) {
        throw new TRPCError({
          message: "Email already exists.",
          code: "UNAUTHORIZED",
        });
      }

      // Ensure the user exists in the user table
      let user = await ctx.db.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!user) {
        user = await ctx.db.user.create({
          data: {
            email: email,
          },
        });
      }

      // hash the password
      const hashedPassword = await hash(password, 10);

      const account = await ctx.db.account.create({
        data: {
          email: email,
          password: hashedPassword,
          provider: "email",
          providerAccountId: email,
          userId: user.id,
          type: "email",
        },
      });
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const { password: _, ...accountWithoutPassword } = account;
      return accountWithoutPassword;
    }),
});
