"use server";

import { db } from "@/db";
import { productTable } from "@/db/schema";

export const getProducts = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      mark: true,
      category: true,
      favorites: true,
      variants: true,
    },
  });

  return products;
};
