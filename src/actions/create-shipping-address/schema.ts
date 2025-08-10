import { z } from "zod";

export const createShippingAddressSchema = z.object({
  email: z.email(),
  fullName: z.string().min(1),
  cpf: z.string().regex(/^\d{11}$/),
  phone: z.string().regex(/^\d{11}$/),
  zipCode: z.string().regex(/^\d{8}$/),
  number: z.string().regex(/^\d+$/),
  complement: z.string().optional().or(z.literal("")),
  neighborhood: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
});

export type CreateShippingAddressSchema = z.infer<
  typeof createShippingAddressSchema
>;
