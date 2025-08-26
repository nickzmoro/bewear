import { db } from "@/db";
import { favoritesTable, productTable, productVariantTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { FavoritesClient } from "./components/favorites-client";
import { redirect } from "next/navigation";

const FavoritesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/");
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

  return (
    <div className="mt-5 flex flex-col px-5 min-sm:items-center min-sm:justify-center min-sm:px-0">
      <div className="min-sm:min-w-[600px] min-lg:min-w-[900px]">
        <h2 className="mt-5 flex items-center gap-2 text-xl font-semibold min-sm:text-2xl">
          Meus Favoritos
        </h2>
        <FavoritesClient initialFavorites={favorites} />
      </div>
    </div>
  );
};

export default FavoritesPage;
