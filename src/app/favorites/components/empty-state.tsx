"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const EmptyState = () => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center">
      <div className="bg-muted flex h-20 w-20 items-center justify-center rounded-full">
        <Heart className="text-muted-foreground h-10 w-10" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Nenhum favorito ainda</h3>
        <p className="text-muted-foreground text-sm">
          Você ainda não adicionou nenhum produto aos seus favoritos.
        </p>
      </div>
      <Button asChild className="rounded-full">
        <Link href="/">Explorar Produtos</Link>
      </Button>
    </div>
  );
};
