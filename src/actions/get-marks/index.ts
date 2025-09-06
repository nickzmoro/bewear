"use server";

import { db } from "@/db";
import { markTable } from "@/db/schema";

export async function getMarks() {
  try {
    const marks = await db.select().from(markTable);
    return { success: true, data: marks };
  } catch (error) {
    return { success: false, error: "Erro ao buscar categorias" };
  }
}
