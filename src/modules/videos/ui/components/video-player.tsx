"use client";
import MuxPlayer from "@mux/mux-player-react";

interface Props {
  thumbnailUrl?: string | null | undefined;
  playbackId?: string | null | undefined;
  autoPlay?: boolean;
  onPlay?: () => void;
}

export default function VideoPlayer({
  thumbnailUrl,
  playbackId,
  autoPlay,
  onPlay,
}: Props) {
  if (!playbackId) return null;

  return (
    <MuxPlayer
      playbackId={playbackId}
      poster={thumbnailUrl!}
      playerInitTime={0}
      autoPlay={autoPlay}
      className="size-full object-contain"
      accentColor="#FF2056"
      onPlay={onPlay}
    />
  );
}
