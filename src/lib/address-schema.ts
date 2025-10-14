import { isValidCpf } from "@/helpers/isValidCpf";
import { z } from "zod";

export const addressFormSchema = z.object({
  email: z.email("Email inválido"),
  fullName: z.string().min(1, "Nome completo é obrigatório"),
  cpf: z
    .string()
    .regex(/^\d{11}$/, "CPF inválido")
    .refine((value) => isValidCpf(value), {
      message: "CPF inválido",
    }),
  phone: z.string().regex(/^\d{11}$/, "Celular inválido"),
  zipCode: z.string().regex(/^\d{8}$/, "CEP inválido"),
  number: z.string().regex(/^\d+$/, "Número deve conter apenas dígitos"),
  complement: z.string().optional().or(z.literal("")),
  street: z.string().min(1, "Rua é obrigatório"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatório"),
  state: z.string().min(1, "Estado é obrigatório"),
});

export type AddressFormValues = z.infer<typeof addressFormSchema>;
