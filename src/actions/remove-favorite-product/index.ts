"use server";

import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";
import z from "zod";

import { db } from "@/db";
import { favoritesTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { removeFavoriteProductSchema } from "./schema";

export const removeFavoriteProduct = async (
  data: z.infer<typeof removeFavoriteProductSchema>,
) => {
  removeFavoriteProductSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Você precisa estar logado para fazer esta ação.");
  }

  const favorite = await db.query.favoritesTable.findFirst({
    where: and(
      eq(favoritesTable.id, data.id),
      eq(favoritesTable.userId, session.user.id),
    ),
  });

  if (!favorite) {
    throw new Error("Produto favoritado não encontrado");
  }

  await db.delete(favoritesTable).where(eq(favoritesTable.id, data.id));
};
