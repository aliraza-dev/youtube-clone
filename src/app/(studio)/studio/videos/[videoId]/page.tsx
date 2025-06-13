import VideoView from "@/modules/studio/ui/views/video-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ videoId: string }>;
}

export default async function VideoID({ params }: Props) {
  const { videoId } = await params;

  void trpc.studio.getOne.prefetch({ id: videoId });

  void trpc.caregories.getMany.prefetch();

  return (
    <HydrateClient>
      <VideoView videoId={videoId} />
    </HydrateClient>
  );
}
