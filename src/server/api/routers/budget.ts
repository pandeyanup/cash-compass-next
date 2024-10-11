import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const budgetRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), amount: z.number().min(0) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.budget.create({
        data: {
          name: input.name,
          amount: input.amount,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const budgets = await ctx.db.budget.findMany({
      where: {
        createdBy: { id: ctx.session.user.id },
      },
    });

    if (!budgets) throw new TRPCError({ code: "NOT_FOUND" });

    return budgets;
  }),
});
