import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";

interface LogInCardProps {
  onClick: () => void;
}

const LogInCard = ({ onClick }: LogInCardProps) => {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClick} />
      <div className="bg-background relative z-10 w-[360px] rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col items-center gap-2 px-3 py-5">
          <p className="text-lg font-semibold">Entre ou crie sua conta</p>
          <div className="h-[1px] w-[50px] bg-gray-300"></div>
          <p className="text-muted-foreground mt-1 text-center text-sm">
            Conecte-se à BEWEAR e aproveite uma experiência feita pra quem se
            veste com personalidade.
          </p>
          <div className="mt-6 w-full">
            <Button
              asChild
              className="w-full rounded-full"
              onClick={onClick}
              size="lg"
            >
              <Link href="/authentication">
                Fazer login <LogIn />
              </Link>
            </Button>
            <Button
              className="mt-2 w-full text-gray-500"
              onClick={onClick}
              variant="ghost"
            >
              Continuar sem login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInCard;
