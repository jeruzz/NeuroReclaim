/**
 * NeuroReclaim Recovery Calculations
 * Funciones para calcular métricas de recuperación según los requisitos clínicos
 */

export interface SavingsMetrics {
  diasSdeReferencia: number;
  aherroDinero: number;
  cantidadEvitada: number;
  tiempoRecuperado: number;
  moneda: string;
}

export interface OneRMCalculation {
  peso: number;
  reps: number;
  oneRM: number;
}

export interface GamificationPoints {
  puntosDiarios: number;
  multiplicadorStreak: number;
  puntosTotales: number;
}

/**
 * Calcula métricas de ahorros y recuperación
 * Fórmulas:
 * - Dinero ahorrado = (días_desde_referencia) * (consumo_diario_previo * costo_por_unidad)
 * - Cantidad evitada = (días_desde_referencia) * (consumo_diario_previo) * factor_conversión
 * - Tiempo recuperado = (cantidad_evitada / unidad_base_médica) * años_perdidos_por_unidad
 */
export function calculateSavingsMetrics(
  fechaInicio: string, // YYYY-MM-DD
  consumoDiarioPrevio: number,
  costoPorUnidad: number,
  moneda: string,
  tipoSustancia: "nicotina" | "metanfetamina",
  unidad: string,
  factorConversion: number = 1
): SavingsMetrics {
  const hoy = new Date();
  const inicio = new Date(fechaInicio);
  
  // Calcular días desde referencia
  const diasSdeReferencia = Math.floor((hoy.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
  
  // Dinero ahorrado
  const aherroDinero = diasSdeReferencia * (consumoDiarioPrevio * costoPorUnidad);
  
  // Cantidad evitada (con factor de conversión si es necesario)
  const cantidadEvitada = diasSdeReferencia * consumoDiarioPrevio * factorConversion;
  
  // Tiempo recuperado basado en tipo de sustancia
  // Parámetros configurables según meta-análisis clínicos
  const tiempoRecuperadoParams = {
    nicotina: {
      unidadBaseMedica: 1, // paquete/día
      añosPerdidosPorUnidad: 0.5, // Basado en NEJM: 12-13 años por fumar
    },
    metanfetamina: {
      unidadBaseMedica: 1, // g/día
      añosPerdidosPorUnidad: 2, // Basado en PMC 2019: ~35 años perdidos en uso crónico
    },
  };
  
  const params = tiempoRecuperadoParams[tipoSustancia];
  const tiempoRecuperado = (cantidadEvitada / params.unidadBaseMedica) * params.añosPerdidosPorUnidad;
  
  return {
    diasSdeReferencia,
    aherroDinero: Math.round(aherroDinero * 100) / 100,
    cantidadEvitada: Math.round(cantidadEvitada * 100) / 100,
    tiempoRecuperado: Math.round(tiempoRecuperado * 100) / 100,
    moneda,
  };
}

/**
 * Calcula el 1RM estimado usando la fórmula de Epley
 * 1RM = peso * (1 + reps/30)
 */
export function calculateOneRM(peso: number, reps: number): OneRMCalculation {
  const oneRM = peso * (1 + reps / 30);
  
  return {
    peso,
    reps,
    oneRM: Math.round(oneRM * 100) / 100,
  };
}

/**
 * Calcula puntos de gamificación
 * Reglas:
 * - +10 por check-in saludable (ánimo > 7, craving < 4)
 * - +20 por workout completado
 * - +50 por streak semanal
 * - Multiplicador de streak: x1.5 si > 7 días
 */
export function calculateGamificationPoints(
  tipoActividad: "check-in-saludable" | "workout" | "streak-semanal",
  streakDias: number = 0
): GamificationPoints {
  const puntosBase = {
    "check-in-saludable": 10,
    "workout": 20,
    "streak-semanal": 50,
  };
  
  const puntosDiarios = puntosBase[tipoActividad];
  const multiplicadorStreak = streakDias > 7 ? 1.5 : 1;
  const puntosTotales = Math.round(puntosDiarios * multiplicadorStreak);
  
  return {
    puntosDiarios,
    multiplicadorStreak,
    puntosTotales,
  };
}

/**
 * Calcula el nivel de dopamina basado en días de abstinencia
 * Niveles:
 * - "Recuperación Inicial" (0-7 días)
 * - "Impulso Estable" (8-30 días)
 * - "Fuerza Consolidada" (31-90 días)
 * - "Maestría Neurológica" (91-365 días)
 * - "Dopamina Legendaria" (>365 días)
 */
export function calculateDopamineLevel(diasSdeReferencia: number): {
  nivel: string;
  minDias: number;
  maxDias: number;
  progreso: number; // 0-100
} {
  const niveles = [
    { nombre: "Recuperación Inicial", min: 0, max: 7 },
    { nombre: "Impulso Estable", min: 8, max: 30 },
    { nombre: "Fuerza Consolidada", min: 31, max: 90 },
    { nombre: "Maestría Neurológica", min: 91, max: 365 },
    { nombre: "Dopamina Legendaria", min: 366, max: Infinity },
  ];
  
  const nivelActual = niveles.find(n => diasSdeReferencia >= n.min && diasSdeReferencia <= n.max) || niveles[0];
  
  let progreso = 0;
  if (nivelActual.max !== Infinity) {
    progreso = Math.round(((diasSdeReferencia - nivelActual.min) / (nivelActual.max - nivelActual.min)) * 100);
  } else {
    progreso = 100;
  }
  
  return {
    nivel: nivelActual.nombre,
    minDias: nivelActual.min,
    maxDias: nivelActual.max === Infinity ? diasSdeReferencia : nivelActual.max,
    progreso: Math.min(progreso, 100),
  };
}

/**
 * Calcula el streak de abstinencia considerando recaídas
 * Retorna los días desde la última recaída (o desde el inicio si no hay recaídas)
 */
export function calculateStreak(
  fechaInicio: string,
  ultimaRecaidaFecha?: string
): number {
  const hoy = new Date();
  const referencia = ultimaRecaidaFecha ? new Date(ultimaRecaidaFecha) : new Date(fechaInicio);
  
  const diasStreak = Math.floor((hoy.getTime() - referencia.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diasStreak);
}

/**
 * Calcula proyecciones de ahorros para períodos futuros
 */
export function projectSavings(
  aherroDiario: number,
  periodosDias: number[]
): Record<number, number> {
  const proyecciones: Record<number, number> = {};
  
  periodosDias.forEach(dias => {
    proyecciones[dias] = Math.round(aherroDiario * dias * 100) / 100;
  });
  
  return proyecciones;
}
