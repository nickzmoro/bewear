"use client";

import OrderSteps from "@/app/cart/components/order-steps";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <>
      <div className="px-5">
        <OrderSteps hasIdentification hasPayment />
      </div>
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="text-center">
          <Image
            src={"/illustration.svg"}
            alt="Sucesso!"
            width={250}
            height={250}
            className="mx-auto"
          />
          <DialogTitle className="mt-6 text-2xl">Pedido efetuado!</DialogTitle>
          <DialogDescription className="font-medium">
            Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
            na seção de “Meus Pedidos”.
          </DialogDescription>

          <DialogFooter>
            <div className="flex w-full flex-col space-y-2">
              <Button className="rounded-full" size="lg">
                <Link href={"/my-orders"}>Ver meus pedidos</Link>
              </Button>
              <Button className="rounded-full" variant="outline" size="lg">
                <Link href={"/"}>Voltar para a loja</Link>
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SuccessPage;
