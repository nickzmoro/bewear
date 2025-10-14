"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  Home,
  LogInIcon,
  LogOutIcon,
  MapPin,
  MenuIcon,
  Search,
  Star,
  Truck,
  User2,
  UserIcon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { toast } from "sonner";
import { Cart } from "./cart";
import { useQueryClient } from "@tanstack/react-query";
import { getUseCartQueryKey } from "@/hooks/queries/use-cart";
import { Separator } from "../ui/separator";
import { useCategories } from "@/hooks/queries/use-categories";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useFavorites } from "@/hooks/queries/use-favorites";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import SearchInput from "./search-input";
import LogInCard from "./log-in-card";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const Header = () => {
  const { data: session } = authClient.useSession();
  const queryClient = useQueryClient();
  const { data: categories } = useCategories();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [cardUserLogin, setCardUserLogin] = useState(false);

  const { data: favorites } = useFavorites();

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <>
      <header className="flex h-auto w-full items-center justify-between p-5 min-sm:px-10">
        <Link href="/">
          <Image src="/logo.svg" alt="BEWEAR" width={100} height={50} />
        </Link>

        <SearchInput isMobile={false} />

        {/* MENU MOBILE */}
        <div className="flex items-center gap-1 min-sm:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className="rounded-full"
          >
            <Search size={20} />
          </Button>
          <Cart />
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-4/5 rounded-l-xl">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              {session?.user ? (
                <>
                  <div className="px-5">
                    <div className="mb-5 flex justify-between space-y-6">
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
                            <h3 className="font-semibold">
                              {session?.user?.name}
                            </h3>
                            <span className="text-muted-foreground block text-xs">
                              {session?.user?.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="my-5 space-y-1">
                      <Button
                        className="flex w-full items-center justify-start font-medium"
                        variant="ghost"
                        asChild
                      >
                        <Link href={"/"} onClick={closeSheet}>
                          <Home /> Início
                        </Link>
                      </Button>
                      <Button
                        className="flex w-full items-center justify-start font-medium"
                        variant="ghost"
                        asChild
                      >
                        <Link
                          href={"/favorites"}
                          className="flex w-full items-center gap-2"
                        >
                          <Star color="#1a1a1a" /> Favoritos
                        </Link>
                      </Button>

                      <Button
                        className="flex w-full items-center justify-start font-medium"
                        variant="ghost"
                        asChild
                      >
                        <Link href={"/my-orders"} onClick={closeSheet}>
                          <Truck /> Meus pedidos
                        </Link>
                      </Button>
                      <Button
                        className="flex w-full items-center justify-start font-medium"
                        variant="ghost"
                        asChild
                      >
                        <Link href={"/addresses"} onClick={closeSheet}>
                          <MapPin /> Meus endereços
                        </Link>
                      </Button>
                    </div>
                    <Separator />
                    <div className="my-2">
                      <Accordion
                        type="single"
                        collapsible
                        defaultValue="item-1"
                        className=""
                      >
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="px-4 hover:no-underline">
                            Categorias
                          </AccordionTrigger>
                          <AccordionContent className="max-h-[150px] overflow-y-auto pl-1">
                            {categories?.data?.map((category) => (
                              <Button
                                className="flex w-full items-center justify-start font-medium text-[#5f5f5f]"
                                variant="ghost"
                                key={category.id}
                                asChild
                              >
                                <Link
                                  href={`/category/${category.slug}`}
                                  onClick={closeSheet}
                                >
                                  {category.name}
                                </Link>
                              </Button>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                    <Separator />
                    <div className="mt-5">
                      <Button
                        size="default"
                        variant="ghost"
                        onClick={() => {
                          authClient.signOut();
                          queryClient.removeQueries({
                            queryKey: getUseCartQueryKey(),
                            exact: false,
                          });
                          toast.info(
                            "Você deslogou da sua conta. Faça login novamente!",
                          );
                          redirect("/");
                        }}
                        className="flex w-full items-center justify-start text-[#656565] hover:bg-red-100 hover:text-red-400"
                      >
                        <LogOutIcon /> Sair da conta
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between px-5 min-sm:hidden">
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

        {/* CONTINUAÇÃO DESKTOP */}
        <div className="hidden items-center gap-1 min-sm:flex">
          {session?.user ? (
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="relative rounded-full"
            >
              <Link href="/favorites">
                <Heart />
                <div className="absolute top-[-10px] right-[-3px] flex items-center justify-center rounded-full bg-[#181818] px-[4px] text-white">
                  <Badge
                    className="w-[1px] bg-[#181818] px-[4px] text-[0.6rem] font-semibold text-white"
                    variant="secondary"
                  >
                    {favorites?.length ?? 0}
                  </Badge>
                </div>
              </Link>
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full"
                onClick={() => setCardUserLogin(true)}
              >
                <Heart />
              </Button>
              {cardUserLogin && (
                <LogInCard onClick={() => setCardUserLogin(false)} />
              )}
            </>
          )}

          <Cart />
          <div>
            {session?.user ? (
              <>
                <DropdownMenu
                  open={isDropdownOpen}
                  onOpenChange={setIsDropdownOpen}
                >
                  <DropdownMenuTrigger className="outline-0" asChild>
                    <Button
                      className="flex items-center gap-2 font-medium"
                      variant={"ghost"}
                    >
                      <Avatar className="h-auto w-6">
                        <AvatarImage
                          src={session?.user?.image as string | undefined}
                        />
                        <AvatarFallback className="bg-gray-200">
                          {session?.user?.name?.split(" ")[0]?.[0]}
                          {session?.user?.name?.split(" ")[1]?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown
                        className={`transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-5">
                    <div className="flex flex-row-reverse items-start px-2">
                      <div className="flex items-start">
                        <Avatar className="mt-2.5 h-auto w-6">
                          <AvatarImage
                            src={session?.user?.image as string | undefined}
                          />
                          <AvatarFallback className="bg-gray-200">
                            {session?.user?.name?.split(" ")[0]?.[0]}
                            {session?.user?.name?.split(" ")[1]?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <DropdownMenuLabel className="pb-0">
                            Olá, {session.user.name}!
                          </DropdownMenuLabel>
                          <DropdownMenuLabel className="pt-0 text-[0.8rem] font-normal text-gray-500">
                            {session.user.email}
                          </DropdownMenuLabel>
                        </div>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link
                        href={"/"}
                        className="flex w-full items-center gap-2"
                      >
                        <Home color="#1a1a1a" /> Início
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href={"/favorites"}
                        className="flex w-full items-center gap-2"
                      >
                        <Star color="#1a1a1a" /> Favoritos
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                      <Link
                        href={"/my-orders"}
                        className="flex w-full items-center gap-2"
                      >
                        <Truck color="#1a1a1a" /> Meus pedidos
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href={"/addresses"}
                        className="flex w-full items-center gap-2"
                      >
                        <MapPin color="#1a1a1a" /> Meus endereços
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="px-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          authClient.signOut();
                          queryClient.removeQueries({
                            queryKey: getUseCartQueryKey(),
                            exact: false,
                          });
                          toast.info(
                            "Você deslogou da sua conta. Faça login novamente!",
                          );
                          redirect("/");
                        }}
                        className="flex w-full items-center justify-start px-0 text-sm font-normal text-red-400 hover:bg-red-100 hover:text-red-400"
                      >
                        <LogOutIcon
                          size={10}
                          className="text-red-400 hover:text-red-500"
                        />{" "}
                        Sair
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button
                variant="ghost"
                asChild
                className="flex gap-1 text-[0.9rem] font-medium hover:opacity-90"
              >
                <Link href="/authentication">
                  <LogInIcon />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* BARRA DE PESQUISA MOBILE */}
      {isSearchVisible && (
        <div className="mb-2 bg-white px-5 pb-2.5 min-sm:hidden">
          <SearchInput isMobile={true} isVisible={true} />
        </div>
      )}
    </>
  );
};

export default Header;
