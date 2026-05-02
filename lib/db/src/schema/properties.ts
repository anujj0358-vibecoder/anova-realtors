import { pgTable, serial, text, integer, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const propertiesTable = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  price: text("price").notNull(),
  priceValue: numeric("price_value", { precision: 15, scale: 2 }).notNull(),
  location: text("location").notNull(),
  type: text("type", { enum: ["buy", "rent"] }).notNull(),
  propertyType: text("property_type").notNull().default("Apartment"),
  description: text("description"),
  imageUrl: text("image_url"),
  beds: integer("beds"),
  baths: integer("baths"),
  area: text("area"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPropertySchema = createInsertSchema(propertiesTable).omit({
  id: true,
  createdAt: true,
});

export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof propertiesTable.$inferSelect;
