import { z } from "zod";

export const getCategoriesSchema = z.object({
  success: z.boolean(),
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
    }),
  ),
  error: z.string().optional(),
});

export type GetCategoriesResponse = z.infer<typeof getCategoriesSchema>;
