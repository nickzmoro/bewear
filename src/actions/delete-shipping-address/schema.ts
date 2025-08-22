import z from "zod";

export const deleteShippingAddressSchema = z.object({
  addressId: z.uuid(),
});

export type DeleteShippingAddressSchema = z.infer<
  typeof deleteShippingAddressSchema
>;
