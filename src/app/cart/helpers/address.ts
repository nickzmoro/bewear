export const formatAddress = (address: {
  recipientName: string;
  street: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}) => {
  const complementAddress = address.complement
    ? ` • ${address.complement}`
    : "";
  return `${address.recipientName} • ${address.street} • ${address.number}${complementAddress} • ${address.neighborhood} • ${address.city} • ${address.state} • CEP: ${address.zipCode}`;
};
