"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z
  .object({
    name: z.string("Nome inválido.").trim().min(1, "Nome é obrigatório."),
    email: z.email("E-mail invalido. Tente novamente."),
    password: z
      .string("Senha inválida. Tente novamente.")
      .min(8, "A senha precisa ter pelo menos 8 caracteres."),
    passwordConfirmation: z
      .string("Senha inválida.")
      .min(8, "A senha precisa ter pelo menos 8 caracteres."),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirmation;
    },
    {
      error: "As senhas não coincidem..",
      path: ["passwordConfirmation"],
    },
  );

type FormValues = z.infer<typeof formSchema>;

const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(values: FormValues) {
    const { data, error } = await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: values.name,
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError: (error) => {
          if (error.error.code === "USER_ALREADY_EXISTS") {
            toast.error("E-mail já cadastrado.");

            form.setError("email", {
              message: "E-mail já cadastrado.",
            });
          }

          toast.error(error.error.message);
        },
      },
    });
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>Crie uma conta para continuar</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o seu nome"
                        {...field}
                        type="name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o seu email"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite a sua senha"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite a sua senha novamente"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Criar conta</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default SignUpForm;
