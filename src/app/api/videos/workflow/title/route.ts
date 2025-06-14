import { db } from "@/db";
import { videos } from "@/db/schema";
import { Receiver } from "@upstash/qstash";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";

interface ContextProps {
  videoId: string;
}

export const { POST } = serve(
  async (context) => {
    const input = context.requestPayload as ContextProps;

    const video = context.run("generate-thumb", async () => {
      const [upVideo] = await db
        .select()
        .from(videos)
        .where(eq(videos.id, input.videoId));

      if (!upVideo) {
        throw new Error("Video not found");
      }

      console.log(upVideo);

      return upVideo;
    });
  },
  {
    receiver: new Receiver({
      currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
      nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
    }),
  }
);
