"use client";

import { toast } from "sonner";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { ResponseModal } from "@/components/responsive-dialog";
import { StudioUploader } from "./studio-uploader";

export const StudioUploadModal = () => {
  const utils = trpc.useUtils();
  const router = useRouter();
  const create = trpc.videos.create.useMutation({
    onSuccess: () => {
      toast.success("Video Created");
      utils.studio.getMany.invalidate();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Something went wrong");
    },
  });

  const onSuccess = () => {
    if (!create?.data?.video.id) return;

    create.reset();
    router.push(`/studio/videos/${create.data.video.id}`);
  };

  return (
    <>
      <ResponseModal
        title="Upload a video"
        onOpenChange={() => create.reset()}
        open={!!create.data?.url}
      >
        {create.data?.url ? (
          <StudioUploader endpoint={create.data?.url} onSuccess={onSuccess} />
        ) : (
          <Loader2Icon />
        )}
      </ResponseModal>
      <Button
        variant={"secondary"}
        onClick={() => create.mutate()}
        disabled={create.isPending}
      >
        {create.isPending ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <PlusIcon />
        )}{" "}
        Create
      </Button>
    </>
  );
};
