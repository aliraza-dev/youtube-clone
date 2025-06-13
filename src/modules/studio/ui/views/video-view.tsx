interface Props {
  videoId: string;
}
export default function VideoView({ videoId }: Props) {
  return <div className="px-4 pt-2.5 max-w-screen-lg">{videoId}</div>;
}
