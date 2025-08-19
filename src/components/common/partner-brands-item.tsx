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
    <>
      <div className="flex flex-col items-center justify-center rounded-3xl border border-[#F1F1F1] py-5">
        <div className="flex h-10 w-10 items-center justify-center">
          <Image
            src={srcImg}
            alt={altImg}
            width={40}
            height={40}
            className="h-8 w-8 object-contain"
          />
        </div>
      </div>
      <div className="mt-2 text-center">
        <p className="truncate text-sm font-medium">{brandName}</p>
      </div>
    </>
  );
};

export default PartnerBrandsItem;
