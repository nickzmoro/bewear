"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";

const CancelPage = () => {
  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="text-center">
        <Image
          src={"/illustration-negative.svg"}
          alt="Sucesso!"
          width={200}
          height={200}
          className="mx-auto"
        />
        <DialogTitle className="mt-6 mb-2 text-2xl">
          Pagamento cancelado
        </DialogTitle>
        <DialogDescription className="mb-2 font-medium">
          Seu pagamento foi cancelado, mas ele está guardado nos "Meus pedidos"
          para uma nova tentativa de compra.
        </DialogDescription>

        <DialogFooter>
          <div className="flex w-full flex-col space-y-2">
            <Button className="rounded-full" variant="destructive" size="lg">
              <Link href={"/my-orders"}>Meus pedidos</Link>
            </Button>
            <Button className="rounded-full" variant="ghost" size="sm">
              <Link href={"/"}>Voltar para a loja</Link>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelPage;
