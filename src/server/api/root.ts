import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { budgetRouter } from "./routers/budget";
import { profileRouter } from "./routers/profile";
import { achievementRouter } from "./routers/achievement";
import { subscriptionRouter } from "./routers/subscription";
import { loginRouter } from "./routers/login";

export const appRouter = createTRPCRouter({
  login: loginRouter,
  budget: budgetRouter,
  profile: profileRouter,
  achievement: achievementRouter,
  subscription: subscriptionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
