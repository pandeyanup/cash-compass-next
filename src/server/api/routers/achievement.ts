import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const achievementRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const achievements = await ctx.db.achievement.findMany({
      where: {
        createdBy: { id: ctx.session.user.id },
      },
    });

    if (!achievements) throw new TRPCError({ code: "NOT_FOUND" });

    return achievements;
  }),
});
