"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { toast } from "sonner";
import { Cart } from "./cart";
import { useQueryClient } from "@tanstack/react-query";
import { getUseCartQueryKey } from "@/hooks/queries/use-cart";

const Header = () => {
  const { data: session } = authClient.useSession();
  const queryClient = useQueryClient();

  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/">
        <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
      </Link>

      <div className="flex items-center gap-1">
        <Cart />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-4/5 rounded-l-xl">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            {session?.user ? (
              <>
                <div className="flex justify-between space-y-6 px-4">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={session?.user?.image as string | undefined}
                        />
                        <AvatarFallback className="bg-gray-200">
                          {session?.user?.name?.split(" ")[0]?.[0]}
                          {session?.user?.name?.split(" ")[1]?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold">{session?.user?.name}</h3>
                        <span className="text-muted-foreground block text-xs">
                          {session?.user?.email}
                        </span>
                      </div>
                    </div>

                    <div>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          authClient.signOut();
                          queryClient.removeQueries({
                            queryKey: getUseCartQueryKey(),
                            exact: false,
                          });
                          toast.info(
                            "Você deslogou da sua conta. Faça login novamente!",
                          );
                        }}
                      >
                        <LogOutIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between px-5">
                <h2 className="font-semibold">Olá. Faça seu login!</h2>
                <Button asChild className="rounded-full" size="lg">
                  <Link href="/authentication">
                    Login
                    <LogInIcon />
                  </Link>
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
