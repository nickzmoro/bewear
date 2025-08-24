"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import {
  addressFormSchema,
  type AddressFormValues,
} from "@/lib/address-schema";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCreateShippingAddress } from "@/hooks/mutations/use-create-shipping-address";
import { useUpdateCartShippingAddress } from "@/hooks/mutations/use-update-cart-shipping-address";
import Image from "next/image";
import Link from "next/link";

type FormValues = AddressFormValues;

const AddressRegisterPage = () => {
  const [addAddressLoading, setAddAddressLoading] = useState(false);
  const [hasFinishedRegistration, setHasFinishedRegistration] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      email: "",
      fullName: "",
      cpf: "",
      phone: "",
      zipCode: "",
      number: "",
      complement: "",
      street: "",
      neighborhood: "",
      city: "",
      state: "",
    },
    mode: "onBlur",
  });

  const createAddress = useCreateShippingAddress();
  const updateShipping = useUpdateCartShippingAddress();

  const onSubmit = (values: FormValues) => {
    setAddAddressLoading(true);
    createAddress.mutate(values, {
      onSuccess: (address) => {
        updateShipping.mutate(
          { shippingAddressId: address.id },
          {
            onSuccess: () => {
              form.reset();
              toast.success("Endereço salvo com sucesso!");
              setHasFinishedRegistration(true);
            },
            onSettled: () => setAddAddressLoading(false),
          },
        );
      },
      onError: () => {
        setAddAddressLoading(false);
        toast.error("Erro ao cadastrar endereço. Tente novamente mais tarde.");
      },
    });
  };

  return (
    <div className="mt-5 flex flex-col px-5 min-sm:items-center min-sm:justify-center min-sm:px-0">
      <div className="min-sm:min-w-[600px] min-lg:min-w-[900px]">
        <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold min-sm:text-2xl">
          Cadastrar um novo endereço
        </h2>

        <Card className="max-w-4xl">
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="seu@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex.: João da Silva" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <PatternFormat
                            format="###.###.###-##"
                            mask="_"
                            value={field.value}
                            customInput={Input}
                            onValueChange={(v) => field.onChange(v.value)}
                            onBlur={field.onBlur}
                            getInputRef={field.ref}
                            placeholder="000.000.000-00"
                            inputMode="numeric"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Celular</FormLabel>
                        <FormControl>
                          <PatternFormat
                            format="(##) #####-####"
                            mask="_"
                            value={field.value}
                            customInput={Input}
                            onValueChange={(v) => field.onChange(v.value)}
                            onBlur={field.onBlur}
                            getInputRef={field.ref}
                            placeholder="(00) 00000-0000"
                            inputMode="numeric"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <PatternFormat
                            format="#####-###"
                            mask="_"
                            value={field.value}
                            customInput={Input}
                            onValueChange={(v) => field.onChange(v.value)}
                            onBlur={field.onBlur}
                            getInputRef={field.ref}
                            placeholder="00000-000"
                            inputMode="numeric"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex.: 1567"
                            inputMode="numeric"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="complement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Complemento</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex.: Apto. 20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rua</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex.: Avenida Nações Unidas"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="neighborhood"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bairro</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex.: Jardim Vermelho"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex.: Jaú" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex.: São Paulo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={addAddressLoading}
                    className="w-full rounded-full"
                    size="lg"
                  >
                    {addAddressLoading && <Loader2 className="animate-spin" />}
                    {addAddressLoading
                      ? `Salvando endereço..`
                      : "Salvar endereço"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {hasFinishedRegistration && (
          <Dialog
            open={hasFinishedRegistration}
            onOpenChange={setHasFinishedRegistration}
          >
            <DialogContent className="text-center">
              <Image
                src={"/address-registration.svg"}
                alt="Sucesso!"
                width={250}
                height={250}
                className="mx-auto"
              />
              <DialogTitle className="mt-6 text-2xl">
                Novo endereço cadastrado
              </DialogTitle>
              <DialogDescription className="font-medium">
                Seu novo endereço foi adicionado com sucesso. Você pode ver a
                lista de endereços na seção de “Meus endereços”.
              </DialogDescription>

              <DialogFooter>
                <div className="flex w-full flex-col space-y-2">
                  <Button className="rounded-full" size="lg" asChild>
                    <Link href={"/addresses"}>Ver meus endereços</Link>
                  </Button>
                  <Button
                    className="rounded-full text-[#424242]"
                    size="lg"
                    variant="ghost"
                    asChild
                  >
                    <Link href={"/"}>Voltar à página inicial</Link>
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default AddressRegisterPage;
