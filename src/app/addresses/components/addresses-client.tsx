"use client";

import { useUserAddresses } from "@/hooks/queries/use-shipping-addresses";
import { shippingAddressTable } from "@/db/schema";
import AddressCardWrapper from "./address-card-wrapper";
import Image from "next/image";
import { EmptyState } from "@/components/common/empty-state";

interface AddressesClientProps {
  initialAddresses: (typeof shippingAddressTable.$inferSelect)[];
}

export const AddressesClient = ({ initialAddresses }: AddressesClientProps) => {
  const { data: addresses } = useUserAddresses({
    initialData: initialAddresses,
  });

  if (!addresses || addresses.length === 0) {
    return (
      <EmptyState
        imageSrc="/illustration-emptyAddresses.svg"
        imageAlt="ilustracao"
        title="Lista de endereços vazia"
        description="Sua lista está vazia, cadastre um novo endereço para visualizá-los."
        classNameImage="!w-[240px] max-sm:!w-[150px]"
      />
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
