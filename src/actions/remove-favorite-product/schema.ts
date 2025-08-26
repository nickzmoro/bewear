import z from "zod";

export const removeFavoriteProductSchema = z.object({
  id: z.uuid(),
});

export type RemoveFavoriteProductSchema = z.infer<
  typeof removeFavoriteProductSchema
>;
