import { ResponseModal } from "@/components/responsive-dialog";
import { UploadDropzone } from "@/lib/uploadthing";
import { trpc } from "@/trpc/client";

interface Props {
  videoId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ThumbnailUploadModal({
  videoId,
  open,
  onOpenChange,
}: Props) {
  const utils = trpc.useUtils();

  const onUploadComplete = () => {
    utils.studio.getOne.invalidate({ id: videoId });
    utils.studio.getMany.invalidate();

    onOpenChange(false);
  };

  return (
    <ResponseModal title="Video" open={open} onOpenChange={onOpenChange}>
      <UploadDropzone
        endpoint={"thumbnailUploader"}
        input={{ videoId }}
        onClientUploadComplete={onUploadComplete}
      />
    </ResponseModal>
  );
}
