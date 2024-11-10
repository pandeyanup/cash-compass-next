import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const budgetRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), amount: z.number().min(0) }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.budget.create({
          data: {
            name: input.name,
            amount: input.amount,
            createdBy: { connect: { id: ctx.session.user.id } },
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create budget",
        });
      }
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const budgets = await ctx.db.budget.findMany({
        where: {
          createdBy: { id: ctx.session.user.id },
        },
      });

      if (!budgets || budgets.length === 0) {
        throw new TRPCError({ code: "NOT_FOUND", message: "No budgets found" });
      }

      return budgets;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to retrieve budgets",
      });
    }
  }),
});
