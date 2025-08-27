import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCentsToBRL } from "@/helpers/money";
import Image from "next/image";
import { Edit } from "lucide-react";

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
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900 max-md:text-lg">
            Seu pedido
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="text-sm text-gray-600">Subtotal</p>
            <p className="text-sm font-medium text-gray-900">
              {formatCentsToBRL(subtotalInCents)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-600">Transporte e Manuseio</p>
            <p className="text-primary text-sm font-medium">Grátis</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-600">Taxa Estimada</p>
            <p className="text-sm font-medium text-gray-900">—</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-semibold text-gray-900">Total</p>
            <p className="text-sm font-semibold text-gray-900">
              {formatCentsToBRL(totalInCents)}
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          {products?.map((product) => (
            <div className="flex items-start gap-4" key={product.id}>
              <div className="flex-shrink-0">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={78}
                  height={78}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {product.name}
                  </p>
                  <p className="text-xs font-medium text-gray-600">
                    {product.variantName}
                  </p>
                  <p className="text-xs font-medium text-gray-600">
                    {product.quantity}x
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <p className="text-sm font-semibold text-gray-900">
                  {formatCentsToBRL(product.priceInCents)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
