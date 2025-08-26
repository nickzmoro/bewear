"use server";

import { db } from "@/db";
import { favoritesTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export const getFavorites = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const favorites = await db.query.favoritesTable.findMany({
    where: eq(favoritesTable.userId, session.user.id),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  return favorites;
};
