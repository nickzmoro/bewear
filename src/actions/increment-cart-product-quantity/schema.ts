import z from "zod";

export const incrementCartProductQuantitySchema = z.object({
  cartItemId: z.uuid(),
});

export type IncrementCartProductQuantitySchema = z.infer<
  typeof incrementCartProductQuantitySchema
>;
