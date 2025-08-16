"use server";

import { db } from "@/db";
import { categoryTable } from "@/db/schema";

export async function getCategories() {
  try {
    const categories = await db.select().from(categoryTable);
    return { success: true, data: categories };
  } catch (error) {
    return { success: false, error: "Erro ao buscar categorias" };
  }
}
