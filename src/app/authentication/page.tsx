import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";
import Header from "@/components/common/header";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const Authentication = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    return redirect("/");
  }

  return (
    <>
      <div className="flex min-h-screen">
        <div className="relative hidden lg:flex lg:w-1/2">
          <Image
            src="/bg-auth.svg"
            alt="bg-auth"
            fill
            className="rounded-r-2xl object-cover object-top"
            priority
          />
          <div className="absolute top-8 left-8 z-10">
            <Link href="/">
              <Image
                src="/logo-branca.svg"
                alt="logo"
                width={120}
                height={40}
                className="h-auto"
              />
            </Link>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center p-8 max-sm:mt-10 max-sm:justify-start lg:w-1/2">
          <div className="mb-10 flex flex-col items-center max-sm:mb-8">
            <Image
              src="/logo.svg"
              alt="logo"
              width={120}
              height={40}
              className="h-auto"
            />
            <p className="text-muted-foreground mt-5 max-w-2/3 text-center text-sm max-sm:max-w-[80%]">
              Olá, seja bem-vindo! Faça login ou crie sua conta e faça parte de
              nós!
            </p>
          </div>

          <div className="w-full max-w-md">
            <Tabs defaultValue="sign-in" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sign-in">Entrar</TabsTrigger>
                <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
              </TabsList>
              <TabsContent value="sign-in" className="mt-3">
                <SignInForm />
              </TabsContent>
              <TabsContent value="sign-up" className="mt-3">
                <SignUpForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
