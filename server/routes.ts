import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for the Festival Foodies application
  // Prefix all routes with /api
  
  // Get all vendors
  app.get("/api/vendors", async (req, res) => {
    try {
      const vendors = await storage.getAllVendors();
      res.json(vendors);
    } catch (error) {
      res.status(500).json({ message: "Error fetching vendors" });
    }
  });
  
  // Get a specific vendor by ID
  app.get("/api/vendors/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid vendor ID" });
      }
      
      const vendor = await storage.getVendor(id);
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }
      
      res.json(vendor);
    } catch (error) {
      res.status(500).json({ message: "Error fetching vendor" });
    }
  });
  
  // Get menu items for a specific vendor
  app.get("/api/vendors/:id/menu", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid vendor ID" });
      }
      
      const menuItems = await storage.getMenuItemsByVendor(id);
      res.json(menuItems);
    } catch (error) {
      res.status(500).json({ message: "Error fetching menu items" });
    }
  });
  
  // Get all events
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Error fetching events" });
    }
  });
  
  // Get events for a specific day
  app.get("/api/events/:day", async (req, res) => {
    try {
      const day = req.params.day;
      if (!day) {
        return res.status(400).json({ message: "Day parameter is required" });
      }
      
      const events = await storage.getEventsByDay(day);
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Error fetching events" });
    }
  });
  
  // Get all photos for the gallery
  app.get("/api/photos", async (req, res) => {
    try {
      const photos = await storage.getAllPhotos();
      res.json(photos);
    } catch (error) {
      res.status(500).json({ message: "Error fetching photos" });
    }
  });
  
  // Get all food categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching categories" });
    }
  });
  
  // Get festival information
  app.get("/api/festival-info", async (req, res) => {
    try {
      const info = await storage.getFestivalInfo();
      if (!info) {
        return res.status(404).json({ message: "Festival information not found" });
      }
      
      res.json(info);
    } catch (error) {
      res.status(500).json({ message: "Error fetching festival information" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
