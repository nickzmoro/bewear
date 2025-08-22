"use client";

import { useUserAddresses } from "@/hooks/queries/use-shipping-addresses";
import { shippingAddressTable } from "@/db/schema";
import AddressCardWrapper from "./address-card-wrapper";

interface AddressesClientProps {
  initialAddresses: (typeof shippingAddressTable.$inferSelect)[];
}

export const AddressesClient = ({ initialAddresses }: AddressesClientProps) => {
  const { data: addresses } = useUserAddresses({
    initialData: initialAddresses,
  });

  if (!addresses || addresses.length === 0) {
    return (
      <div className="mt-5 text-center text-gray-500">
        Nenhum endereço cadastrado.
      </div>
    );
  }

  return (
    <>
      {addresses.map((address) => (
        <AddressCardWrapper
          key={address.id}
          id={address.id}
          city={address.city}
          cpf={address.cpf}
          number={address.number}
          phone={address.phone}
          recipientName={address.recipientName}
          state={address.state}
          street={address.street}
          zipCode={address.zipCode}
          complement={address.complement}
        />
      ))}
    </>
  );
};
