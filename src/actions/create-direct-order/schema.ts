import { z } from "zod";

export const createDirectOrderSchema = z.object({
  productVariantId: z.string().uuid(),
  quantity: z.number().min(1),
});

export type CreateDirectOrderSchema = z.infer<typeof createDirectOrderSchema>;
