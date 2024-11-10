import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    if (!user) throw new TRPCError({ code: "NOT_FOUND" });

    return user;
  }),

  updateProfile: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.db.user.findUnique({
          where: { id: ctx.session.user.id },
          select: {
            id: true,
          },
        });

        if (!user) throw new TRPCError({ code: "NOT_FOUND" });

        if (user.id !== ctx.session.user.id) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You are not authorized to update this profile",
          });
        }

        const updatedUser = await ctx.db.user.update({
          where: { id: ctx.session.user.id },
          data: { name: input.name },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        });

        return updatedUser;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update profile",
        });
      }
    }),

  //TODO: remove this route::: FORBIDDEN
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    return users;
  }),
});
