"use client";

import AddressCard from "@/components/common/address-card";
import DeleteButton from "./delete-button";

interface AddressCardWrapperProps {
  id: string;
  street: string;
  city: string;
  state: string;
  number: string;
  zipCode: string;
  phone: string;
  cpf: string;
  recipientName: string;
  complement: string | null;
}

const AddressCardWrapper = ({
  id,
  street,
  city,
  state,
  number,
  zipCode,
  phone,
  cpf,
  recipientName,
  complement,
}: AddressCardWrapperProps) => {
  return (
    <AddressCard
      id={id}
      city={city}
      cpf={cpf}
      number={number}
      phone={phone}
      recipientName={recipientName}
      state={state}
      street={street}
      zipCode={zipCode}
      complement={complement}
    >
      <DeleteButton addressId={id} />
    </AddressCard>
  );
};

export default AddressCardWrapper;
