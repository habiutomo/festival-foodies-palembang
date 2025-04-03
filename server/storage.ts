import { 
  users, type User, type InsertUser,
  vendors, type Vendor, type InsertVendor,
  menuItems, type MenuItem, type InsertMenuItem,
  events, type Event, type InsertEvent,
  photos, type Photo, type InsertPhoto,
  categories, type Category, type InsertCategory,
  festivalInfo, type FestivalInfo, type InsertFestivalInfo
} from "@shared/schema";

// Modify the interface with CRUD methods
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Vendors
  getAllVendors(): Promise<Vendor[]>;
  getVendor(id: number): Promise<Vendor | undefined>;
  createVendor(vendor: InsertVendor): Promise<Vendor>;
  
  // Menu Items
  getMenuItemsByVendor(vendorId: number): Promise<MenuItem[]>;
  getMenuItem(id: number): Promise<MenuItem | undefined>;
  createMenuItem(menuItem: InsertMenuItem): Promise<MenuItem>;
  
  // Events
  getAllEvents(): Promise<Event[]>;
  getEventsByDay(day: string): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Photos
  getAllPhotos(): Promise<Photo[]>;
  getPhoto(id: number): Promise<Photo | undefined>;
  createPhoto(photo: InsertPhoto): Promise<Photo>;
  
  // Categories
  getAllCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Festival Info
  getFestivalInfo(): Promise<FestivalInfo | undefined>;
  createFestivalInfo(info: InsertFestivalInfo): Promise<FestivalInfo>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private vendors: Map<number, Vendor>;
  private menuItems: Map<number, MenuItem>;
  private events: Map<number, Event>;
  private photos: Map<number, Photo>;
  private categoriesMap: Map<number, Category>;
  private festivalInfoList: Map<number, FestivalInfo>;
  
  currentId: { 
    users: number;
    vendors: number;
    menuItems: number;
    events: number;
    photos: number;
    categories: number;
    festivalInfo: number;
  };

  constructor() {
    this.users = new Map();
    this.vendors = new Map();
    this.menuItems = new Map();
    this.events = new Map();
    this.photos = new Map();
    this.categoriesMap = new Map();
    this.festivalInfoList = new Map();
    
    this.currentId = {
      users: 1,
      vendors: 1,
      menuItems: 1,
      events: 1,
      photos: 1,
      categories: 1,
      festivalInfo: 1
    };
    
    // Initialize with sample data
    this.initializeData();
  }
  
  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Vendors
  async getAllVendors(): Promise<Vendor[]> {
    return Array.from(this.vendors.values());
  }
  
  async getVendor(id: number): Promise<Vendor | undefined> {
    return this.vendors.get(id);
  }
  
  async createVendor(insertVendor: InsertVendor): Promise<Vendor> {
    const id = this.currentId.vendors++;
    const vendor: Vendor = { ...insertVendor, id };
    this.vendors.set(id, vendor);
    return vendor;
  }
  
  // Menu Items
  async getMenuItemsByVendor(vendorId: number): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(
      (menuItem) => menuItem.vendorId === vendorId
    );
  }
  
  async getMenuItem(id: number): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }
  
  async createMenuItem(insertMenuItem: InsertMenuItem): Promise<MenuItem> {
    const id = this.currentId.menuItems++;
    const menuItem: MenuItem = { ...insertMenuItem, id };
    this.menuItems.set(id, menuItem);
    return menuItem;
  }
  
  // Events
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }
  
  async getEventsByDay(day: string): Promise<Event[]> {
    return Array.from(this.events.values()).filter(
      (event) => event.day === day
    );
  }
  
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentId.events++;
    const event: Event = { ...insertEvent, id };
    this.events.set(id, event);
    return event;
  }
  
  // Photos
  async getAllPhotos(): Promise<Photo[]> {
    return Array.from(this.photos.values());
  }
  
  async getPhoto(id: number): Promise<Photo | undefined> {
    return this.photos.get(id);
  }
  
  async createPhoto(insertPhoto: InsertPhoto): Promise<Photo> {
    const id = this.currentId.photos++;
    const photo: Photo = { ...insertPhoto, id };
    this.photos.set(id, photo);
    return photo;
  }
  
  // Categories
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categoriesMap.values());
  }
  
  async getCategory(id: number): Promise<Category | undefined> {
    return this.categoriesMap.get(id);
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentId.categories++;
    const category: Category = { ...insertCategory, id };
    this.categoriesMap.set(id, category);
    return category;
  }
  
  // Festival Info
  async getFestivalInfo(): Promise<FestivalInfo | undefined> {
    // Always return the first one if exists
    const values = Array.from(this.festivalInfoList.values());
    return values.length > 0 ? values[0] : undefined;
  }
  
  async createFestivalInfo(insertFestivalInfo: InsertFestivalInfo): Promise<FestivalInfo> {
    const id = this.currentId.festivalInfo++;
    const festivalInfo: FestivalInfo = { ...insertFestivalInfo, id };
    this.festivalInfoList.set(id, festivalInfo);
    return festivalInfo;
  }
  
  // Initialize with sample data
  private initializeData() {
    // Initialize Categories
    const categoryData: InsertCategory[] = [
      { name: "Pempek", nameEn: "Pempek" },
      { name: "Tekwan", nameEn: "Tekwan" },
      { name: "Mie Celor", nameEn: "Mie Celor" },
      { name: "Martabak", nameEn: "Martabak" },
      { name: "Minuman", nameEn: "Beverages" },
      { name: "Makanan Tradisional", nameEn: "Traditional Food" },
      { name: "Kuah Santan", nameEn: "Coconut Milk Soup" },
      { name: "Sup Ikan", nameEn: "Fish Soup" },
      { name: "Es", nameEn: "Ice" },
      { name: "Kue Tradisional", nameEn: "Traditional Cake" },
      { name: "Makanan Penutup", nameEn: "Dessert" },
      { name: "Gorengan", nameEn: "Fried Food" }
    ];
    
    categoryData.forEach(category => {
      const id = this.currentId.categories++;
      this.categoriesMap.set(id, { ...category, id });
    });
    
    // Initialize Vendors
    const vendorData: InsertVendor[] = [
      {
        name: "Pempek Palembang Ny. Kamto",
        description: "Pempek legendaris dari resep turun temurun keluarga Ny. Kamto sejak 1980. Menggunakan ikan segar dan bumbu pilihan.",
        imageUrl: "https://images.unsplash.com/photo-1603088549410-8f5a1d94cf91?auto=format&q=80&w=800&fit=crop",
        location: "Area Kuliner Utama",
        mapPosition: { top: "40%", left: "30%" },
        tags: ["Pempek", "Makanan Tradisional"],
        startingPrice: 15000,
        rating: "4.5",
        hours: "10:00 - 21:00 WIB",
        isPopular: true,
        pinType: "food"
      },
      {
        name: "Mie Celor Mang Ipin",
        description: "Mie celor dengan kuah santan kental dan udang segar. Disajikan dengan telur rebus dan bawang goreng.",
        imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&q=80&w=800&fit=crop",
        location: "Area Kuliner Timur",
        mapPosition: { top: "35%", left: "55%" },
        tags: ["Mie Celor", "Kuah Santan"],
        startingPrice: 20000,
        rating: "4.3",
        hours: "11:00 - 20:00 WIB",
        isPopular: false,
        pinType: "food"
      },
      {
        name: "Tekwan Pak Raden",
        description: "Tekwan dari daging ikan tenggiri pilihan, dimasak dengan kaldu udang yang gurih dan segar.",
        imageUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&q=80&w=800&fit=crop",
        location: "Area Kuliner Selatan",
        mapPosition: { top: "60%", left: "45%" },
        tags: ["Tekwan", "Sup Ikan"],
        startingPrice: 25000,
        rating: "4.7",
        hours: "10:00 - 20:00 WIB",
        isPopular: false,
        pinType: "food"
      },
      {
        name: "Es Kacang Merah Bu Siti",
        description: "Es kacang merah segar dengan campuran kelapa muda, cincau, dan sirup gula merah. Minuman tradisional yang menyegarkan.",
        imageUrl: "https://images.unsplash.com/photo-1541288097308-7b8e3f58c4c6?auto=format&q=80&w=800&fit=crop",
        location: "Area Minuman",
        mapPosition: { top: "50%", left: "70%" },
        tags: ["Minuman", "Es"],
        startingPrice: 12000,
        rating: "4.4",
        hours: "10:00 - 22:00 WIB",
        isPopular: false,
        pinType: "drink"
      },
      {
        name: "Kue Maksuba Khas Palembang",
        description: "Kue maksuba yang lembut dan manis, terbuat dari telur, gula, dan santan. Kue tradisional khas Palembang.",
        imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&q=80&w=800&fit=crop",
        location: "Area Kue Tradisional",
        mapPosition: { top: "25%", left: "65%" },
        tags: ["Kue Tradisional", "Makanan Penutup"],
        startingPrice: 15000,
        rating: "4.6",
        hours: "09:00 - 20:00 WIB",
        isPopular: false,
        pinType: "snack"
      },
      {
        name: "Martabak HAR Palembang",
        description: "Martabak HAR dengan isian daging sapi cincang dan telur. Disajikan dengan kuah cuka khas Palembang.",
        imageUrl: "https://images.unsplash.com/photo-1617622141573-2e00d8dea5b4?auto=format&q=80&w=800&fit=crop",
        location: "Area Kuliner Barat",
        mapPosition: { top: "45%", left: "20%" },
        tags: ["Martabak", "Gorengan"],
        startingPrice: 30000,
        rating: "4.8",
        hours: "15:00 - 22:00 WIB",
        isPopular: true,
        pinType: "food"
      }
    ];
    
    vendorData.forEach(vendor => {
      const id = this.currentId.vendors++;
      this.vendors.set(id, { ...vendor, id });
    });
    
    // Initialize Menu Items
    const menuItemsData: InsertMenuItem[] = [
      {
        name: "Pempek Kapal Selam",
        description: "Pempek isi telur ukuran besar",
        price: 25000,
        vendorId: 1,
        isPopular: true
      },
      {
        name: "Pempek Lenjer (5 pcs)",
        description: "Pempek berbentuk silinder panjang",
        price: 20000,
        vendorId: 1,
        isPopular: true
      },
      {
        name: "Paket Campur",
        description: "Berbagai jenis pempek dalam satu porsi",
        price: 35000,
        vendorId: 1,
        isPopular: true
      },
      {
        name: "Mie Celor Spesial",
        description: "Mie celor dengan ekstra udang dan telur",
        price: 25000,
        vendorId: 2,
        isPopular: true
      },
      {
        name: "Mie Celor Biasa",
        description: "Mie celor original dengan kuah santan",
        price: 20000,
        vendorId: 2,
        isPopular: false
      },
      {
        name: "Tekwan Spesial",
        description: "Tekwan dengan ekstra bakso ikan dan jamur",
        price: 30000,
        vendorId: 3,
        isPopular: true
      },
      {
        name: "Tekwan Reguler",
        description: "Tekwan dengan porsi reguler",
        price: 25000,
        vendorId: 3,
        isPopular: false
      },
      {
        name: "Es Kacang Merah Spesial",
        description: "Es kacang merah dengan tambahan durian",
        price: 18000,
        vendorId: 4,
        isPopular: true
      },
      {
        name: "Es Kacang Merah Reguler",
        description: "Es kacang merah original",
        price: 12000,
        vendorId: 4,
        isPopular: false
      },
      {
        name: "Kue Maksuba (1 potong)",
        description: "Kue maksuba lembut dengan tambahan kismis",
        price: 15000,
        vendorId: 5,
        isPopular: true
      },
      {
        name: "Kue Maksuba Box (4 potong)",
        description: "Kue maksuba dalam kemasan box untuk oleh-oleh",
        price: 55000,
        vendorId: 5,
        isPopular: false
      },
      {
        name: "Martabak HAR Spesial",
        description: "Martabak HAR ukuran besar dengan daging pilihan",
        price: 45000,
        vendorId: 6,
        isPopular: true
      },
      {
        name: "Martabak HAR Mini (2 pcs)",
        description: "Martabak HAR ukuran kecil untuk camilan",
        price: 30000,
        vendorId: 6,
        isPopular: false
      }
    ];
    
    menuItemsData.forEach(menuItem => {
      const id = this.currentId.menuItems++;
      this.menuItems.set(id, { ...menuItem, id });
    });
    
    // Initialize Events
    const eventData: InsertEvent[] = [
      {
        name: "Pembukaan Festival Foodies Palembang",
        description: "Pembukaan resmi Festival Foodies Palembang oleh Walikota, dilengkapi dengan tarian tradisional dan pertunjukan musik.",
        startTime: "10:00",
        endTime: "11:00",
        location: "Panggung Utama",
        day: "Jumat, 10 November",
        iconType: "primary"
      },
      {
        name: "Demo Masak Pempek Palembang",
        description: "Demonstrasi langsung pembuatan pempek Palembang oleh Chef Haryo, lengkap dengan tips membuat cuko yang autentik.",
        startTime: "13:00",
        endTime: "14:30",
        location: "Area Kuliner",
        day: "Jumat, 10 November",
        iconType: "secondary"
      },
      {
        name: "Lomba Makan Pempek",
        description: "Kompetisi makan pempek dengan hadiah menarik. Pendaftaran dibuka 1 jam sebelum acara dimulai.",
        startTime: "16:00",
        endTime: "17:00",
        location: "Panggung Utama",
        day: "Jumat, 10 November",
        iconType: "accent"
      },
      {
        name: "Pertunjukan Musik Tradisional",
        description: "Pertunjukan musik tradisional Sumatera Selatan yang menampilkan alat musik gendang, akordion, dan gitar.",
        startTime: "19:00",
        endTime: "21:00",
        location: "Panggung Utama",
        day: "Jumat, 10 November",
        iconType: "primary"
      },
      {
        name: "Workshop Kue Tradisional",
        description: "Belajar membuat kue maksuba dan kue delapan jam khas Palembang.",
        startTime: "10:00",
        endTime: "12:00",
        location: "Area Workshop",
        day: "Sabtu, 11 November",
        iconType: "secondary"
      },
      {
        name: "Talkshow Kuliner Palembang",
        description: "Diskusi tentang sejarah dan perkembangan kuliner Palembang bersama pakar kuliner lokal.",
        startTime: "14:00",
        endTime: "15:30",
        location: "Panggung Utama",
        day: "Sabtu, 11 November",
        iconType: "primary"
      },
      {
        name: "Kontes Foto Makanan",
        description: "Lomba fotografi makanan khas Palembang dengan hadiah menarik.",
        startTime: "16:00",
        endTime: "18:00",
        location: "Area Festival",
        day: "Sabtu, 11 November",
        iconType: "accent"
      },
      {
        name: "Pertunjukan Musik Modern",
        description: "Penampilan band lokal dengan repertoar lagu kontemporer.",
        startTime: "19:00",
        endTime: "22:00",
        location: "Panggung Utama",
        day: "Sabtu, 11 November",
        iconType: "primary"
      },
      {
        name: "Senam Pagi Bersama",
        description: "Aktivitas senam pagi untuk semua pengunjung festival.",
        startTime: "08:00",
        endTime: "09:00",
        location: "Area Terbuka",
        day: "Minggu, 12 November",
        iconType: "secondary"
      },
      {
        name: "Cooking Challenge",
        description: "Kompetisi memasak dengan bahan utama ikan untuk umum.",
        startTime: "11:00",
        endTime: "13:00",
        location: "Area Kompetisi",
        day: "Minggu, 12 November",
        iconType: "accent"
      },
      {
        name: "Parade Kuliner Nusantara",
        description: "Pameran dan degustasi makanan khas seluruh Indonesia.",
        startTime: "15:00",
        endTime: "17:00",
        location: "Area Festival",
        day: "Minggu, 12 November",
        iconType: "primary"
      },
      {
        name: "Penutupan Festival",
        description: "Acara penutupan dengan pengumuman pemenang berbagai kompetisi dan pertunjukan spesial.",
        startTime: "19:00",
        endTime: "21:00",
        location: "Panggung Utama",
        day: "Minggu, 12 November",
        iconType: "primary"
      }
    ];
    
    eventData.forEach(event => {
      const id = this.currentId.events++;
      this.events.set(id, { ...event, id });
    });
    
    // Initialize Photos
    const photoData: InsertPhoto[] = [
      {
        imageUrl: "https://images.unsplash.com/photo-1603088549410-8f5a1d94cf91?auto=format&q=80&w=800&fit=crop",
        caption: "Pempek Palembang",
        category: "food"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&q=80&w=800&fit=crop",
        caption: "Mie Celor",
        category: "food"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1617622141573-2e00d8dea5b4?auto=format&q=80&w=800&fit=crop",
        caption: "Martabak",
        category: "food"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1605333396915-47ed6dbd235e?auto=format&q=80&w=800&fit=crop",
        caption: "Suasana Festival",
        category: "event"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1534574467531-9e21b3c2946c?auto=format&q=80&w=800&fit=crop",
        caption: "Pertunjukan Musik",
        category: "event"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&q=80&w=800&fit=crop",
        caption: "Hidangan Tradisional",
        category: "food"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1567508343542-598ead4949b7?auto=format&q=80&w=800&fit=crop",
        caption: "Demo Memasak",
        category: "event"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1516905365385-7f89706faef8?auto=format&q=80&w=800&fit=crop",
        caption: "Pengunjung Festival",
        category: "people"
      }
    ];
    
    photoData.forEach(photo => {
      const id = this.currentId.photos++;
      this.photos.set(id, { ...photo, id });
    });
    
    // Initialize Festival Info
    const festivalInfoData: InsertFestivalInfo = {
      startDate: "10 November 2023",
      endDate: "12 November 2023",
      hours: "10:00 - 22:00 WIB",
      location: "Benteng Kuto Besak, Palembang",
      ticketPrice: "Rp 25.000/orang"
    };
    
    const id = this.currentId.festivalInfo++;
    this.festivalInfoList.set(id, { ...festivalInfoData, id });
  }
}

export const storage = new MemStorage();
