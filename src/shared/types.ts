import z from "zod";

/**
 * Types shared between the client and server go here.
 *
 * For example, we can add zod schemas for API input validation, and derive types from them:
 *
 * export const TodoSchema = z.object({
 *   id: z.number(),
 *   name: z.string(),
 *   completed: z.number().int(), // 0 or 1
 * })
 *
 * export type TodoType = z.infer<typeof TodoSchema>;
 */

export const PublicHymnSchema = z.object({
  id: z.number().optional(),
  number: z.string().min(1).max(10),
  name: z.string().min(1).max(200),
  submitted_by: z.string().max(100).optional(),
});

export type PublicHymn = z.infer<typeof PublicHymnSchema>;

export const CreatePublicHymnSchema = z.object({
  name: z.string().min(1).max(200).trim(),
  submitted_by: z.string().max(100).optional(),
});
