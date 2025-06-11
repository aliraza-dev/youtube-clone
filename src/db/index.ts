import { drizzle } from "drizzle-orm/neon-http";

export const db = drizzle(process.env.DATABASE_URL!, {
  logger: {
    logQuery(query, params) {
      console.log("Query", query, "Params", params);
    },
  },
});
