import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const counterTable = pgTable("counter", {
    id: varchar({ length: 255 }).notNull().primaryKey(),
  count: integer().default(0)
});
