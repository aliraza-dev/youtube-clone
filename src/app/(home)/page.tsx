// import { trpc } from "@/trpc/client";
import { HomeView } from "@/modules/home/ui/views/home-view";
import { HydrateClient } from "@/trpc/server";
import { trpc } from "@/trpc/server";

interface PageProps {
  searchParams: Promise<{ categoryId?: string }>;
}

export const dynamic = "force-dynamic";

async function Page({ searchParams }: PageProps) {
  // const { data } = trpc.hello.useQuery({ text: "Ali" });
  // const data = await trpc.hello({ text: "Ali" });

  const { categoryId } = await searchParams;

  void trpc.caregories.getMany.prefetch();

  return (
    <HydrateClient>
      <HomeView categoryId={categoryId} />
    </HydrateClient>
  );
}

export default Page;
