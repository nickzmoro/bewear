"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PatternFormat } from "react-number-format";
import { useCreateShippingAddress } from "@/hooks/mutations/use-create-shipping-address";
import { useUserAddresses } from "@/hooks/queries/use-shipping-addresses";
import { shippingAddressTable } from "@/db/schema";
import { Loader2 } from "lucide-react";
import { useUpdateCartShippingAddress } from "@/hooks/mutations/use-update-cart-shipping-address";
import { toast } from "sonner";
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";
import { useRouter } from "next/navigation";
import { formatAddress } from "../../helpers/address";

const formSchema = z.object({
  email: z.email("Email inválido"),
  fullName: z.string().min(1, "Nome completo é obrigatório"),
  cpf: z.string().regex(/^\d{11}$/, "CPF inválido"),
  phone: z.string().regex(/^\d{11}$/, "Celular inválido"),
  zipCode: z.string().regex(/^\d{8}$/, "CEP inválido"),
  number: z.string().regex(/^\d+$/, "Número deve conter apenas dígitos"),
  complement: z.string().optional().or(z.literal("")),
  street: z.string().min(1, "Rua é obrigatório"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatório"),
  state: z.string().min(1, "Estado é obrigatório"),
});

type FormValues = z.infer<typeof formSchema>;

interface AddressesProps {
  shippingAddresses: (typeof shippingAddressTable.$inferSelect)[];
  defaultShippingAddressId: string | null;
}

const Addresses = ({
  shippingAddresses,
  defaultShippingAddressId,
}: AddressesProps) => {
  const router = useRouter();

  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    defaultShippingAddressId || null,
  );
  const [addAddressLoading, setAddAddressLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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
  const { data: addresses, isLoading } = useUserAddresses({
    initialData: shippingAddresses,
  });

  const onSubmit = (values: FormValues) => {
    setAddAddressLoading(true);
    createAddress.mutate(values, {
      onSuccess: (address) => {
        updateShipping.mutate(
          { shippingAddressId: address.id },
          {
            onSuccess: () => {
              form.reset();
              setSelectedAddress(address.id);
              toast.success("Endereço salvo com sucesso!");
            },
            onSettled: () => setAddAddressLoading(false),
          },
        );
      },
      onError: () => setAddAddressLoading(false),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={selectedAddress ?? undefined}
          onValueChange={setSelectedAddress}
        >
          {addresses?.map((address) => {
            const id = address.id;
            return (
              <Card
                key={id}
                className="cursor-pointer"
                onClick={() => setSelectedAddress(id)}
              >
                <CardContent className="py-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={id} id={`address_${id}`} />
                    <Label htmlFor={`address_${id}`}>
                      {formatAddress(address)}
                    </Label>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          <Card>
            <CardContent className="py-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="add_new" id="add_new" />
                <Label htmlFor="add_new">Adicionar novo endereço</Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>

        {selectedAddress === "add_new" && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        <Input placeholder="Nome completo" {...field} />
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
                          placeholder="Número"
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
                        <Input placeholder="Complemento" {...field} />
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
                        <Input placeholder="Rua" {...field} />
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
                        <Input placeholder="Bairro" {...field} />
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
                        <Input placeholder="Cidade" {...field} />
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
                        <Input placeholder="Estado" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full">
                <Button
                  type="submit"
                  disabled={addAddressLoading}
                  className="w-full"
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
        )}
        {selectedAddress && selectedAddress !== "add_new" && (
          <div className="w-full">
            <Button
              className="w-full"
              size="lg"
              disabled={updateShipping.isPending}
              onClick={() => {
                updateShipping.mutate(
                  { shippingAddressId: selectedAddress },
                  { onSuccess: () => router.push("/cart/confirmation") },
                );
              }}
            >
              {updateShipping.isPending && <Loader2 className="animate-spin" />}
              {updateShipping.isPending
                ? "Salvando endereço.."
                : "Ir para pagamento"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Addresses;
