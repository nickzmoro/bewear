import { z } from "zod";

export const getShippingAddressesSchema = z.object({});

export type GetShippingAddressesSchema = z.infer<
  typeof getShippingAddressesSchema
>;
