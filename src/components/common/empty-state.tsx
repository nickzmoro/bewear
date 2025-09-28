import Image from "next/image";

interface EmptyStateProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  className?: string;
}

export const EmptyState = ({
  imageSrc,
  imageAlt,
  title,
  description,
  className = "",
}: EmptyStateProps) => {
  return (
    <div
      className={`mt-10 flex flex-col items-center justify-center text-gray-500 ${className}`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        width="250"
        height="0"
        className="h-auto"
      />
      <div className="mt-8 flex h-auto max-w-[400px] flex-col gap-2 text-center">
        <h3 className="text-xl font-semibold text-[#141414]">{title}</h3>
        <span className="text-muted-foreground leading-5">{description}</span>
      </div>
    </div>
  );
};
