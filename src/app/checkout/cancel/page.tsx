"use client";

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

const CancelPage = () => {
  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="text-center">
        <Image
          src={"/illustration-negative.svg"}
          alt="Sucesso!"
          width={250}
          height={250}
          className="mx-auto"
        />
        <DialogTitle className="mt-6 text-2xl">Pagamento cancelado</DialogTitle>
        <DialogDescription className="font-medium">
          Seu pagamento foi cancelado... Tente novamente mais tarde.
        </DialogDescription>

        <DialogFooter>
          <div className="flex w-full flex-col space-y-2">
            <Button className="rounded-full" variant="destructive" size="lg">
              <Link href={"/"}>Voltar para a loja</Link>
            </Button>
            <Button className="rounded-full" variant="ghost" size="sm">
              <Link href={"/my-orders"}>Ir aos meus pedidos</Link>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelPage;
