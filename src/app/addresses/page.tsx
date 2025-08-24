import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { AddressesClient } from "./components/addresses-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

const MyAddressesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable?.userId, session?.user.id),
  });

  return (
    <div className="mt-5 flex flex-col px-5 min-sm:items-center min-sm:justify-center min-sm:px-0">
      <div className="min-sm:min-w-[600px]">
        <h2 className="mt-5 flex items-center gap-2 text-xl font-semibold min-sm:text-2xl">
          Endereços
        </h2>
        <AddressesClient initialAddresses={shippingAddresses} />
        <Button
          className="mt-5 flex w-full gap-2 rounded-full"
          size="lg"
          asChild
        >
          <Link href="/addresses/register">
            <Plus size={22} color="#fff" /> Adicionar um endereço
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default MyAddressesPage;
