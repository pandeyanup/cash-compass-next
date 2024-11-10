import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.category.create({
          data: {
            name: input.name,
            createdBy: { connect: { id: ctx.session.user.id } },
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create category",
        });
      }
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const categories = await ctx.db.category.findMany({
        where: {
          createdBy: { id: ctx.session.user.id },
        },
      });

      if (!categories || categories.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No categories found",
        });
      }

      return categories;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to retrieve categories",
      });
    }
  }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        if (!input.id) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Category ID is required",
          });
        }

        const category = await ctx.db.category.findUnique({
          where: { id: input.id },
        });

        if (!category) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Category not found",
          });
        }

        // Ensure the user owns the category
        if (category.createdById !== ctx.session.user.id) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You do not have permission to update this category",
          });
        }

        return await ctx.db.category.update({
          where: { id: input.id },
          data: {
            name: input.name,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update budget",
        });
      }
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        if (!input.id) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Category ID is required",
          });
        }

        const category = await ctx.db.category.findUnique({
          where: { id: input.id },
        });

        if (!category) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Category not found",
          });
        }

        // Ensure the user owns the category
        if (category.createdById !== ctx.session.user.id) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You do not have permission to delete this category",
          });
        }

        return await ctx.db.category.delete({
          where: { id: input.id },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete category",
        });
      }
    }),
});
