import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const subscriptionRouter = createTRPCRouter({
  getStatus: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.subscription.findFirst({
      where: {
        createdBy: { id: ctx.session.user.id },
      },
    });
  }),
});
