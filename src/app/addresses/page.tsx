import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import {
  EllipsisVertical,
  Home,
  Option,
  Plus,
  Trash,
  Trash2,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

const MyAddressesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("User not found");
  }

  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable?.userId, session?.user.id),
  });

  return (
    <div className="mt-3 px-5 min-sm:px-10">
      <h2 className="flex items-center gap-2 text-xl font-semibold">
        Endereços
      </h2>
      {shippingAddresses.length > 0 ? (
        <>
          {shippingAddresses.map((address) => (
            <Card className="mt-5" key={address.id}>
              <CardContent className="flex justify-between gap-2">
                <div className="flex gap-4">
                  <div>
                    <Home size={20} />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <p className="text-[0.9rem] font-medium">
                      {address.street} {address.number} {address.complement}
                    </p>
                    <span className="text-sm text-[#646464]">
                      CEP: {address.zipCode} - {address.city}, {address.state}
                    </span>
                    <span className="text-sm text-[#646464]">
                      {address.recipientName} - {address.cpf.slice(0, 3)}.
                      {address.cpf.slice(3, 6)}.{address.cpf.slice(6, 9)}-
                      {address.cpf.slice(9, 11)} - ({address.phone.slice(0, 2)}){" "}
                      {address.phone.slice(2, 7)}-{address.phone.slice(7, 11)}
                    </span>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger className="h-fit rounded-full outline-0">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full"
                    >
                      <EllipsisVertical size={20} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-3">
                    <DropdownMenuLabel>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex w-full items-center justify-start gap-2 text-red-400 transition-colors duration-200 ease-in-out hover:bg-red-100 hover:text-red-400"
                      >
                        <Trash2
                          size={15}
                          className="text-red-400 hover:text-red-500"
                        />{" "}
                        Excluir
                      </Button>
                    </DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          ))}
          <div className="mt-5">
            <Button size="lg" className="w-full rounded-full" asChild>
              <Link href={"/addresses/register"}>
                <Plus /> Adicionar endereço
              </Link>
            </Button>
          </div>
        </>
      ) : (
        <div className="mt-5 flex flex-col gap-5">
          <p className="text-sm text-[#646464]">
            Você ainda não adicionou nenhum endereço. Que tal adicionar um novo?
          </p>
          <Button size="lg" className="w-full rounded-full" asChild>
            <Link href={"/addresses/register"}>
              <Plus /> Adicionar endereço
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyAddressesPage;
