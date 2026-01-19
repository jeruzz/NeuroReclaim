/**
 * Unified type exports
 * Import shared types from this single entry point.
 */

export type * from "../drizzle/schema";
export * from "./_core/errors";

// NeuroReclaim Types
export type SubstanceType = "nicotina" | "metanfetamina";

export interface Exercise {
  nombre: string;
  series: number;
  reps: number;
  rpe: number; // Rate of Perceived Exertion (1-10)
  oneRMEstimado?: number;
}

export interface Biometrics {
  heartRate?: number;
  steps?: number;
  sleepHours?: number;
  [key: string]: any;
}

export interface SavingsMetricsResponse {
  diasSdeReferencia: number;
  aherroDinero: number;
  cantidadEvitada: number;
  tiempoRecuperado: number;
  moneda: string;
  proyecciones?: {
    dias7: number;
    dias30: number;
    dias90: number;
    dias365: number;
  };
}

export interface GamificationState {
  nivel: string;
  puntos: number;
  streak: number;
  badges: string[];
  proximoNivel: string;
  progreso: number; // 0-100
}

export interface DopamineLevel {
  nivel: string;
  minDias: number;
  maxDias: number;
  progreso: number;
}

export interface OnboardingData {
  tipoSustancia: SubstanceType;
  unidad: string;
  precioUnitario: number;
  consumoDiarioPrevio: number;
  moneda: string;
  fechaInicio: string;
}
