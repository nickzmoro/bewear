"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PartnerBrandsItem from "./partner-brands-item";

interface PartnerBrandsListProps {
  title: string;
}

const PartnerBrandsList = ({ title }: PartnerBrandsListProps) => {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold min-sm:text-lg min-lg:text-2xl">{title}</h3>
      <Swiper
        className="mySwiper swiper-h"
        spaceBetween={10}
        slidesPerView={3}
        breakpoints={{
          320: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          1000: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          1280: {
            slidesPerView: 7,
            spaceBetween: 0,
          },
        }}
      >
        <SwiperSlide>
          <PartnerBrandsItem
            srcImg="/nike.svg"
            altImg="Nike"
            brandName="Nike"
          />
        </SwiperSlide>
        <SwiperSlide>
          <PartnerBrandsItem
            srcImg="/adidas.svg"
            altImg="Adidas"
            brandName="Adidas"
          />
        </SwiperSlide>
        <SwiperSlide>
          <PartnerBrandsItem
            srcImg="/puma.svg"
            altImg="Puma"
            brandName="Puma"
          />
        </SwiperSlide>
        <SwiperSlide>
          <PartnerBrandsItem
            srcImg="/new-balance.svg"
            altImg="New Balance"
            brandName="New Balance"
          />
        </SwiperSlide>
        <SwiperSlide>
          <PartnerBrandsItem
            srcImg="/converse.svg"
            altImg="Converse Logo"
            brandName="Converse"
          />
        </SwiperSlide>
        <SwiperSlide>
          <PartnerBrandsItem
            srcImg="/polo.svg"
            altImg="Polo Logo"
            brandName="Polo"
          />
        </SwiperSlide>
        <SwiperSlide>
          <PartnerBrandsItem
            srcImg="/zara.svg"
            altImg="Zara logo"
            brandName="Zara"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PartnerBrandsList;
