import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, substanceConfig, workouts, checkins, relapseLogs, InsertSubstanceConfig, InsertWorkout, InsertCheckin, InsertRelapseLog } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// NeuroReclaim Database Functions

// Substance Config
export async function createSubstanceConfig(data: InsertSubstanceConfig) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(substanceConfig).values(data);
  return result[0]?.insertId || 0;
}

export async function getSubstanceConfig(userId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(substanceConfig).where(eq(substanceConfig.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateSubstanceConfig(id: number, data: Partial<InsertSubstanceConfig>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(substanceConfig).set(data).where(eq(substanceConfig.id, id));
}

// Workouts
export async function createWorkout(data: InsertWorkout) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(workouts).values(data);
  return result[0]?.insertId || 0;
}

export async function getUserWorkouts(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(workouts).where(eq(workouts.userId, userId));
}

export async function updateWorkout(id: number, data: Partial<InsertWorkout>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(workouts).set(data).where(eq(workouts.id, id));
}

export async function deleteWorkout(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(workouts).where(eq(workouts.id, id));
}

// Check-ins
export async function createCheckin(data: InsertCheckin) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(checkins).values(data);
  return result[0]?.insertId || 0;
}

export async function getUserCheckins(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(checkins).where(eq(checkins.userId, userId));
}

export async function updateCheckin(id: number, data: Partial<InsertCheckin>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(checkins).set(data).where(eq(checkins.id, id));
}

// Relapse Logs
export async function createRelapseLog(data: InsertRelapseLog) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(relapseLogs).values(data);
  return result[0]?.insertId || 0;
}

export async function getUserRelapseLogs(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(relapseLogs).where(eq(relapseLogs.userId, userId));
}

export async function updateRelapseLog(id: number, data: Partial<InsertRelapseLog>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(relapseLogs).set(data).where(eq(relapseLogs.id, id));
}
