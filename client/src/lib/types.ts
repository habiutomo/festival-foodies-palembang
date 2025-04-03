import { z } from 'zod';
import type { Vendor, MenuItem, Event, Photo, Category, FestivalInfo } from '@shared/schema';

// Data response schemas for API responses
export const vendorResponseSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  location: z.string(),
  mapPosition: z.object({
    top: z.string(),
    left: z.string()
  }),
  tags: z.array(z.string()),
  startingPrice: z.number(),
  rating: z.string(),
  hours: z.string(),
  isPopular: z.boolean(),
  pinType: z.string()
}));

export const menuItemResponseSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  vendorId: z.number(),
  isPopular: z.boolean()
}));

export const eventResponseSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  location: z.string(),
  day: z.string(),
  iconType: z.string()
}));

export const photoResponseSchema = z.array(z.object({
  id: z.number(),
  imageUrl: z.string(),
  caption: z.string(),
  category: z.string()
}));

export const categoryResponseSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
  nameEn: z.string()
}));

export const festivalInfoResponseSchema = z.object({
  id: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  hours: z.string(),
  location: z.string(),
  ticketPrice: z.string()
});

// Language type
export type Language = 'id' | 'en';
