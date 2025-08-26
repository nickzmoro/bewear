import z from "zod";

export const addFavoriteProductSchema = z.object({
  productId: z.uuid(),
});

export type AddFavoriteProductSchema = z.infer<typeof addFavoriteProductSchema>;
