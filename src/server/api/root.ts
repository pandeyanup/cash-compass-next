import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { loginRouter } from "./routers/login";
import { budgetRouter } from "./routers/budget";
import { profileRouter } from "./routers/profile";
import { achievementRouter } from "./routers/achievement";
import { subscriptionRouter } from "./routers/subscription";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  login: loginRouter,
  budget: budgetRouter,
  profile: profileRouter,
  achievement: achievementRouter,
  subscription: subscriptionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
