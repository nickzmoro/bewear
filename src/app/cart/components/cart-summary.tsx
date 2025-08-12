import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCentsToBRL } from "@/helpers/money";
import Image from "next/image";

interface CartSummaryProps {
  subtotalInCents: number;
  totalInCents: number;
  products: Array<{
    id: string;
    name: string;
    variantName: string;
    quantity: number;
    priceInCents: number;
    imageUrl: string;
  }>;
}

const CartSummary = ({
  subtotalInCents,
  totalInCents,
  products,
}: CartSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <p className="text-sm">Subtotal</p>
            <p className="text-muted-foreground text-sm font-medium">
              {formatCentsToBRL(subtotalInCents)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm">Frete</p>
            <p className="text-primary text-sm font-medium">Grátis</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm">Total</p>
            <p className="text-sm font-semibold text-black">
              {formatCentsToBRL(totalInCents)}
            </p>
          </div>
        </div>

        <Separator />

        {products?.map((product) => (
          <div className="flex items-center justify-between" key={product.id}>
            <div className="flex items-center gap-4">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={78}
                height={78}
                className="rounded-lg"
              />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold">{product.name}</p>
                <p className="text-muted-foreground text-xs font-medium">
                  Variação: ({product.variantName})
                </p>
                <p className="text-muted-foreground text-xs font-medium">
                  {product.quantity}x
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end justify-center gap-2">
              <p className="text-sm font-semibold">
                {formatCentsToBRL(product.priceInCents)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CartSummary;
