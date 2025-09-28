import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { AddressesClient } from "./components/addresses-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import Header from "@/components/common/header";
import { redirect } from "next/navigation";

const MyAddressesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }

  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable?.userId, session?.user.id),
  });

  return (
    <>
      <Header />
      <div className="mt-5 flex flex-col px-5 min-sm:items-center min-sm:justify-center min-sm:px-0">
        <div className="h-auto min-sm:min-w-[600px] min-lg:min-w-[900px]">
          <div className="flex justify-between">
            <h2 className="mt-5 flex items-center gap-2 text-xl font-semibold min-sm:text-2xl">
              Endereços
            </h2>
            <Button
              className="mt-5 flex w-fit gap-2 rounded-full"
              size="lg"
              asChild
            >
              <Link href="/addresses/register">
                <Plus size={22} color="#fff" absoluteStrokeWidth /> Adicionar
              </Link>
            </Button>
          </div>
          <div className="mt-3 h-[1px] w-2/12 bg-[#00000025]"></div>
          <AddressesClient initialAddresses={shippingAddresses} />
        </div>
      </div>
    </>
  );
};

export default MyAddressesPage;
