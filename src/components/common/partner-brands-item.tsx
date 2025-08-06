import Image from "next/image";

interface PartnerBrandsItemProps {
  srcImg: string;
  altImg: string;
  brandName: string;
}

const PartnerBrandsItem = ({
  srcImg,
  altImg,
  brandName,
}: PartnerBrandsItemProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="rounded-3xl border border-[#F1F1F1] p-5">
        <Image src={srcImg} alt={altImg} width={50} height={0} />
      </div>

      <div className="flex max-w-[200px] flex-col gap-1">
        <p className="truncate text-sm font-semibold">{brandName}</p>
      </div>
    </div>
  );
};

export default PartnerBrandsItem;
