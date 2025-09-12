"use client";

import { productTable, productVariantTable } from "@/db/schema";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import ProductItem from "./product-item";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold min-sm:text-lg min-lg:text-2xl">
          {title}
        </h3>
        <Link
          href="/catalog"
          className="group text-muted-foreground flex items-center gap-1 pr-10 text-sm font-medium hover:text-[#414141]"
        >
          Ver todos
          <ChevronRight
            size={16}
            className="duration-200 ease-in-out group-hover:translate-x-0.5"
          />
        </Link>
      </div>
      <Swiper
        className="mySwiper swiper-h"
        spaceBetween={50}
        slidesPerView={1}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1000: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductItem product={product} showFavoriteActions={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductList;
