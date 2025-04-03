import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users schema (keeping original)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Vendors schema
export const vendors = pgTable("vendors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  location: text("location").notNull(),
  mapPosition: json("map_position").notNull(), // {top: string, left: string}
  tags: text("tags").array().notNull(),
  startingPrice: integer("starting_price").notNull(),
  rating: text("rating").notNull(),
  hours: text("hours").notNull(),
  isPopular: boolean("is_popular").default(false),
  pinType: text("pin_type").notNull().default("food"), // 'food', 'drink', 'snack'
});

export const insertVendorSchema = createInsertSchema(vendors).omit({
  id: true,
});

export type InsertVendor = z.infer<typeof insertVendorSchema>;
export type Vendor = typeof vendors.$inferSelect;

// Menu Items schema
export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  vendorId: integer("vendor_id").notNull(),
  isPopular: boolean("is_popular").default(false),
});

export const insertMenuItemSchema = createInsertSchema(menuItems).omit({
  id: true,
});

export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;
export type MenuItem = typeof menuItems.$inferSelect;

// Events schema
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  location: text("location").notNull(),
  day: text("day").notNull(),
  iconType: text("icon_type").notNull(), // 'primary', 'secondary', 'accent'
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
});

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

// Gallery Photos schema
export const photos = pgTable("photos", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  caption: text("caption").notNull(),
  category: text("category").notNull(), // 'food', 'event', 'people'
});

export const insertPhotoSchema = createInsertSchema(photos).omit({
  id: true,
});

export type InsertPhoto = z.infer<typeof insertPhotoSchema>;
export type Photo = typeof photos.$inferSelect;

// Food Categories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  nameEn: text("name_en").notNull(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// Festival Information
export const festivalInfo = pgTable("festival_info", {
  id: serial("id").primaryKey(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  hours: text("hours").notNull(),
  location: text("location").notNull(),
  ticketPrice: text("ticket_price").notNull(),
});

export const insertFestivalInfoSchema = createInsertSchema(festivalInfo).omit({
  id: true,
});

export type InsertFestivalInfo = z.infer<typeof insertFestivalInfoSchema>;
export type FestivalInfo = typeof festivalInfo.$inferSelect;
