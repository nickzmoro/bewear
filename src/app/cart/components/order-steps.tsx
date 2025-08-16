import { Check, Dot } from "lucide-react";

interface OrderStepsProps {
  hasIdentification: boolean;
  hasPayment: boolean;
}

const OrderSteps = ({ hasIdentification, hasPayment }: OrderStepsProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-[#0EAD00] p-1">
          <Check size={12} color="#fff" />
        </div>
        <span className="text-sm font-medium text-[#4d4d4d]">Sacola</span>
      </div>
      <div>
        <Dot color="#0EAD00" />
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`rounded-full p-1 text-[0.8rem] ${hasIdentification ? "bg-[#0EAD00] text-white" : "border border-[#0EAD00] text-[#0EAD00]"}`}
        >
          {hasIdentification ? (
            <Check size={12} color="#fff" />
          ) : (
            <p className="flex h-3 w-3 items-center justify-center text-[0.7rem] font-medium">
              2
            </p>
          )}
        </div>
        <span className="text-sm font-medium text-[#4d4d4d]">
          Identificação
        </span>
      </div>
      <div>
        <Dot color="#0EAD00" />
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`rounded-full p-1 text-[0.8rem] ${hasPayment ? "bg-[#0EAD00] text-white" : "border border-[#0EAD00] text-[#0EAD00]"}`}
        >
          {hasPayment ? (
            <Check size={12} color="#fff" />
          ) : (
            <p className="flex h-3 w-3 items-center justify-center text-[0.7rem] font-medium">
              3
            </p>
          )}
        </div>
        <span className="text-sm font-medium text-[#4d4d4d]">Pagamento</span>
      </div>
    </div>
  );
};

export default OrderSteps;
