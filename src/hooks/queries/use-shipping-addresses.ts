import { useQuery } from "@tanstack/react-query";
import { getShippingAddresses } from "@/actions/get-shipping-addresses";
import { shippingAddressTable } from "@/db/schema";

export const getUseShippingAddressesQueryKey = () =>
  ["shipping-addresses"] as const;

export const useShippingAddresses = (params?: {
  initialData?: (typeof shippingAddressTable.$inferSelect)[];
}) => {
  return useQuery({
    queryKey: getUseShippingAddressesQueryKey(),
    queryFn: () => getShippingAddresses(),
    initialData: params?.initialData,
  });
};
