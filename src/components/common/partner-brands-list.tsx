import PartnerBrandsItem from "./partner-brands-item";

interface PartnerBrandsListProps {
  title: string;
}

const PartnerBrandsList = ({ title }: PartnerBrandsListProps) => {
  return (
    <div className="space-y-6">
      <h3 className="px-5 font-semibold">{title}</h3>
      <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        <PartnerBrandsItem srcImg="/nike.svg" altImg="Nike" brandName="Nike" />
        <PartnerBrandsItem
          srcImg="/adidas.svg"
          altImg="Adidas"
          brandName="Adidas"
        />
        <PartnerBrandsItem srcImg="/puma.svg" altImg="Puma" brandName="Puma" />
        <PartnerBrandsItem
          srcImg="/new-balance.svg"
          altImg="New Balance"
          brandName="New Balance"
        />
      </div>
    </div>
  );
};

export default PartnerBrandsList;
