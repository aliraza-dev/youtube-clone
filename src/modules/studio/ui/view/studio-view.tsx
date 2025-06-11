import VideosSection from "../sections/videos-section";

export default function StudioView() {
  return (
    <div className="flex flex-col gap-y-6 pt-2.5">
      <div className="px-4">
        <h1 className="text-2xl font-bold">Chanel Content</h1>

        <p className="text-xs text-muted-foreground">
          Manage your content and videos
        </p>
      </div>

      <VideosSection />
    </div>
  );
}
