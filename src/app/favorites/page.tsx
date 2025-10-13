import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { FavoritesClient } from "./components/favorites-client";
import { redirect } from "next/navigation";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

const FavoritesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="flex h-screen flex-col justify-between">
      <Header />
      <div className="flex flex-col px-5 min-sm:items-center min-sm:justify-center min-sm:px-0">
        <div className="min-sm:min-w-[600px] min-lg:min-w-[900px]">
          <h2 className="mt-5 flex items-center gap-2 text-xl font-semibold min-sm:text-2xl">
            Meus Favoritos
          </h2>
          <div className="mt-3 h-[1px] w-2/12 bg-[#00000025]"></div>
          <FavoritesClient />
        </div>
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default FavoritesPage;
