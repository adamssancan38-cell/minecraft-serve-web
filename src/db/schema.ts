import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  // Imagen o GIF opcional guardado como data URL (data:image/...;base64,...)
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
