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
import { useFinishOrder } from "@/hooks/mutations/use-finish-order";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const FinishOrderButton = () => {
  const [successDialog, setSuccessDialog] = useState(true);
  const finishOrderMutation = useFinishOrder();

  return (
    <>
      <Button
        className="w-full rounded-full"
        size="lg"
        onClick={() => finishOrderMutation.mutate()}
        disabled={finishOrderMutation.isPending}
      >
        {finishOrderMutation.isPending && <Loader2 className="animate-spin" />}
        {finishOrderMutation.isPending ? "Processando.." : "Finalizar compra"}
      </Button>
      <Dialog open={successDialog} onOpenChange={setSuccessDialog}>
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
                Ver meus pedidos
              </Button>
              <Button className="rounded-full" variant="outline" size="lg">
                Voltar para a loja
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FinishOrderButton;
