import { users, type User, type InsertUser, type Payment, type InsertPayment } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User>;
  updateStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User>;
  updateUserStripeInfo(userId: number, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePayment(id: number, updates: Partial<Payment>): Promise<Payment>;
  getPaymentsByUserId(userId: number): Promise<Payment[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private payments: Map<number, Payment>;
  private currentUserId: number;
  private currentPaymentId: number;

  constructor() {
    this.users = new Map();
    this.payments = new Map();
    this.currentUserId = 1;
    this.currentPaymentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      email: insertUser.email || null,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      subscriptionStatus: "inactive",
      subscriptionPlan: null,
      subscriptionPeriod: null,
      subscriptionEndsAt: null,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async updateStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User> {
    return this.updateUser(userId, { stripeCustomerId });
  }

  async updateUserStripeInfo(userId: number, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User> {
    return this.updateUser(userId, { 
      stripeCustomerId, 
      stripeSubscriptionId,
      subscriptionStatus: "active" 
    });
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const id = this.currentPaymentId++;
    const payment: Payment = {
      ...insertPayment,
      id,
      userId: insertPayment.userId || null,
      currency: insertPayment.currency || "usd",
      stripePaymentId: insertPayment.stripePaymentId || null,
      cryptoPaymentId: insertPayment.cryptoPaymentId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.payments.set(id, payment);
    return payment;
  }

  async updatePayment(id: number, updates: Partial<Payment>): Promise<Payment> {
    const payment = this.payments.get(id);
    if (!payment) {
      throw new Error(`Payment with id ${id} not found`);
    }
    const updatedPayment = { ...payment, ...updates, updatedAt: new Date() };
    this.payments.set(id, updatedPayment);
    return updatedPayment;
  }

  async getPaymentsByUserId(userId: number): Promise<Payment[]> {
    const payments = Array.from(this.payments.values());
    return payments.filter(payment => payment.userId === userId);
  }
}

export const storage = new MemStorage();
