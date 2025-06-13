import Image from "next/image";
import { CloudRainWind } from "lucide-react";

import { formatDuration } from "@/lib/utils";

interface Props {
  imageUrl?: string | null;
  previewUrl?: string | null;
  title: string;
  duration: number;
}

export default function VideoThumbnail({
  imageUrl,
  title,
  previewUrl,
  duration,
}: Props) {
  return (
    <div className="relative group ">
      <div className="relative w-full overflow-hidden roundex-xl aspect-video bg-gray-400 text-gray-50 rounded-lg">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={title}
              className="size-full object-cover group-hover:opacity-0"
              fill
            />
            {previewUrl && (
              <Image
                src={previewUrl}
                alt={title}
                className="size-full object-cover opacity-0 group-hover:opacity-100"
                fill
              />
            )}
          </>
        ) : (
          <CloudRainWind className="size-full object-cover p-4" />
        )}
      </div>

      <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium">
        {formatDuration(duration)}
      </div>
    </div>
  );
}
