import { createTRPCRouter } from "../init";
import { videosRouter } from "@/modules/videos/server/procedures";
import { studioRouter } from "@/modules/studio/ui/server/procedures";
import { categoriesRouter } from "@/modules/categories/server/procedure";

export const appRouter = createTRPCRouter({
  studio: studioRouter,
  videos: videosRouter,
  caregories: categoriesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
