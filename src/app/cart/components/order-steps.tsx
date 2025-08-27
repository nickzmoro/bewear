import { Check, Dot } from "lucide-react";

interface OrderStepsProps {
  hasIdentification: boolean;
  hasPayment: boolean;
}

const OrderSteps = ({ hasIdentification, hasPayment }: OrderStepsProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-4 max-sm:gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 max-sm:h-6 max-sm:w-6">
            <Check size={16} className="text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">Sacola</span>
        </div>

        <div className="h-0.5 bg-green-600 max-sm:w-3 min-sm:w-12"></div>

        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full max-sm:h-6 max-sm:w-6 ${
              hasIdentification
                ? "bg-green-600 text-white"
                : "border-2 border-green-600 text-green-600"
            }`}
          >
            {hasIdentification ? (
              <Check size={16} />
            ) : (
              <span className="text-sm font-semibold">2</span>
            )}
          </div>
          <span className="text-sm font-medium text-gray-700">
            Identificação
          </span>
        </div>

        <div className="h-0.5 bg-gray-300 max-sm:w-3 min-sm:w-12"></div>

        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full max-sm:h-6 max-sm:w-6 ${
              hasPayment
                ? "bg-green-600 text-white"
                : "border-2 border-gray-300 text-gray-400"
            }`}
          >
            {hasPayment ? (
              <Check size={16} />
            ) : (
              <span className="text-sm font-semibold">3</span>
            )}
          </div>
          <span className="text-sm font-medium text-gray-700">Pagamento</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSteps;
