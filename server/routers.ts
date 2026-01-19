import { z } from "zod";
import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import * as db from "./db";

// Validation Schemas
const substanceConfigSchema = z.object({
  tipoSustancia: z.enum(["nicotina", "metanfetamina"]),
  unidad: z.string().min(1),
  precioUnitario: z.string().min(1),
  moneda: z.string().min(1),
  fechaInicioAbstinencia: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  ajustesPersonalizados: z.string().optional(),
});

const workoutSchema = z.object({
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  ejercicios: z.string(),
  caloriasEstimadas: z.number().optional(),
});

const checkinSchema = z.object({
  estadoAnimo: z.number().min(1).max(10),
  craving: z.number().min(1).max(10),
  notas: z.string().optional(),
  biometrics: z.string().optional(),
});

const relapseLogSchema = z.object({
  triggerTags: z.string().optional(),
  contexto: z.string().optional(),
  impactoEconomico: z.string().optional(),
  reinicioCleanStreak: z.number().optional(),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Substance Configuration
  substanceConfig: router({
    create: protectedProcedure
      .input(substanceConfigSchema)
      .mutation(({ ctx, input }) => {
        return db.createSubstanceConfig({
          userId: ctx.user.id,
          ...input,
        });
      }),

    get: protectedProcedure.query(({ ctx }) => {
      return db.getSubstanceConfig(ctx.user.id);
    }),

    update: protectedProcedure
      .input(z.object({ id: z.number(), ...substanceConfigSchema.shape }))
      .mutation(({ input }) => {
        const { id, ...data } = input;
        return db.updateSubstanceConfig(id, data);
      }),
  }),

  // Workouts
  workouts: router({
    create: protectedProcedure
      .input(workoutSchema)
      .mutation(({ ctx, input }) => {
        return db.createWorkout({
          userId: ctx.user.id,
          ...input,
        });
      }),

    list: protectedProcedure.query(({ ctx }) => {
      return db.getUserWorkouts(ctx.user.id);
    }),

    update: protectedProcedure
      .input(z.object({ id: z.number(), ...workoutSchema.shape }))
      .mutation(({ input }) => {
        const { id, ...data } = input;
        return db.updateWorkout(id, data);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => {
        return db.deleteWorkout(input.id);
      }),
  }),

  // Check-ins
  checkins: router({
    create: protectedProcedure
      .input(checkinSchema)
      .mutation(({ ctx, input }) => {
        return db.createCheckin({
          userId: ctx.user.id,
          fecha: new Date(),
          ...input,
        });
      }),

    list: protectedProcedure.query(({ ctx }) => {
      return db.getUserCheckins(ctx.user.id);
    }),

    update: protectedProcedure
      .input(z.object({ id: z.number(), ...checkinSchema.shape }))
      .mutation(({ input }) => {
        const { id, ...data } = input;
        return db.updateCheckin(id, data);
      }),
  }),

  // Relapse Logs
  relapseLogs: router({
    create: protectedProcedure
      .input(relapseLogSchema)
      .mutation(({ ctx, input }) => {
        return db.createRelapseLog({
          userId: ctx.user.id,
          fecha: new Date(),
          ...input,
        });
      }),

    list: protectedProcedure.query(({ ctx }) => {
      return db.getUserRelapseLogs(ctx.user.id);
    }),

    update: protectedProcedure
      .input(z.object({ id: z.number(), ...relapseLogSchema.shape }))
      .mutation(({ input }) => {
        const { id, ...data } = input;
        return db.updateRelapseLog(id, data);
      }),
  }),
});

export type AppRouter = typeof appRouter;
