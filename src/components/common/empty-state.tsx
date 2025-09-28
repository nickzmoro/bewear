import Image from "next/image";

interface EmptyStateProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  classNameTitle?: string;
  classNameDescription?: string;
  classNameImage?: string;
}

export const EmptyState = ({
  imageSrc,
  imageAlt,
  title,
  description,
  classNameTitle = "",
  classNameDescription = "",
  classNameImage = "",
}: EmptyStateProps) => {
  return (
    <div
      className={`mt-10 flex flex-col items-center justify-center text-gray-500`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        width="200"
        height="0"
        className={`h-auto ${classNameImage}`}
      />
      <div className="mt-8 flex h-auto max-w-[400px] flex-col gap-2 text-center">
        <h3
          className={`text-xl font-semibold text-[#141414] max-sm:text-[16px] ${classNameTitle}`}
        >
          {title}
        </h3>
        <span
          className={`text-muted-foreground leading-5 max-sm:text-sm ${classNameDescription}`}
        >
          {description}
        </span>
      </div>
    </div>
  );
};
