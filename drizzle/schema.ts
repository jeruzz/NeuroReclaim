import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// NeuroReclaim Tables

export const substanceConfig = mysqlTable("substance_config", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  tipoSustancia: mysqlEnum("tipo_sustancia", ["nicotina", "metanfetamina"]).notNull(),
  unidad: varchar("unidad", { length: 20 }).notNull(),
  precioUnitario: varchar("precio_unitario", { length: 20 }).notNull(),
  moneda: varchar("moneda", { length: 3 }).notNull(),
  fechaInicioAbstinencia: varchar("fecha_inicio_abstinencia", { length: 10 }).notNull(),
  ajustesPersonalizados: text("ajustes_personalizados"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const workouts = mysqlTable("workouts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  fecha: varchar("fecha", { length: 10 }).notNull(),
  ejercicios: text("ejercicios"),
  caloriasEstimadas: int("calorias_estimadas"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const checkins = mysqlTable("checkins", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  fecha: timestamp("fecha").notNull(),
  estadoAnimo: int("estado_animo"),
  craving: int("craving"),
  notas: text("notas"),
  biometrics: text("biometrics"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const relapseLogs = mysqlTable("relapse_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  fecha: timestamp("fecha").notNull(),
  triggerTags: text("trigger_tags"),
  contexto: text("contexto"),
  impactoEconomico: varchar("impacto_economico", { length: 20 }),
  reinicioCleanStreak: int("reinicio_clean_streak").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Export types
export type SubstanceConfig = typeof substanceConfig.$inferSelect;
export type InsertSubstanceConfig = typeof substanceConfig.$inferInsert;
export type Workout = typeof workouts.$inferSelect;
export type InsertWorkout = typeof workouts.$inferInsert;
export type Checkin = typeof checkins.$inferSelect;
export type InsertCheckin = typeof checkins.$inferInsert;
export type RelapseLog = typeof relapseLogs.$inferSelect;
export type InsertRelapseLog = typeof relapseLogs.$inferInsert;
