"use client";

import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorBoundary } from "react-error-boundary";
import {
  CopyCheckIcon,
  CopyIcon,
  ImagePlusIcon,
  MoreVerticalIcon,
  RotateCcw,
  Sparkle,
  TrashIcon,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { videoUpdateSchema } from "@/db/schema";
import { toast } from "sonner";
import VideoPlayer from "@/modules/videos/ui/components/video-player";
import Link from "next/link";
import { snakeCaseToTile } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { THUMBNAIL_PLACEHOLDER } from "@/modules/videos/constants";
import ThumbnailUploadModal from "../components/thumbnail-upload-modal";

interface Props {
  videoId: string;
}

function FormSectionSuspense({ videoId }: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const [thumbnailModalOpen, setThumbnailModalOpen] = useState(false);
  const router = useRouter();

  const utils = trpc.useUtils();
  const [video] = trpc.studio.getOne.useSuspenseQuery({ id: videoId });
  const [categories] = trpc.caregories.getMany.useSuspenseQuery();

  const update = trpc.videos.update.useMutation({
    onSuccess: () => {
      utils.studio.getMany.invalidate();

      utils.studio.getOne.invalidate({ id: videoId });
      toast.success("Updated successfully");
    },
    onError: () => {
      toast.error("Something went wrong,");
    },
  });

  const remove = trpc.videos.remove.useMutation({
    onSuccess: () => {
      utils.studio.getMany.invalidate();
      router.push("/studio");
      toast.success("Removed  ");
    },
    onError: () => {
      toast.error("Something went wrong,");
    },
  });

  const form = useForm({
    resolver: zodResolver(videoUpdateSchema),
    defaultValues: video,
  });

  const onSubmit = async (data: any) => {
    await update.mutateAsync(data);
  };

  const fullUrl = `${
    process.env.VERCEL_URL || "http://localhost:3000"
  }/videos/${videoId}`;

  const onCopy = async () => {
    await navigator.clipboard.writeText(fullUrl);

    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 2000);
  };

  const generateThumbnail = trpc.videos.generateThumbnail.useMutation({
    onSuccess: () => {
      toast.success("Generating thumbnail", {
        description: "Will take a few minutes",
      });
    },
    onError: () => {
      toast.error("Something went wrong, please try again");
    },
  });

  return (
    <>
      <ThumbnailUploadModal
        open={thumbnailModalOpen}
        onOpenChange={setThumbnailModalOpen}
        videoId={video.id}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between mb-6">
            <div className="">
              <h1 className="text-2xl font-bold">Video Details</h1>
              <p className="text-muted-foreground text-xs">
                Manage your view details
              </p>
            </div>

            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={update.isPending}>
                Save
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} size={"icon"}>
                    <MoreVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => remove.mutate({ id: videoId })}
                  >
                    <TrashIcon className="size-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="space-y-8 lg:col-span-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>

                    <FormControl>
                      <Input {...field} placeholder="Title" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>

                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Add a Description"
                        rows={10}
                        className="resize-none pr-10"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="thumbnailUrl"
                control={form.control}
                render={() => (
                  <FormItem>
                    <FormLabel>Thumbnail</FormLabel>

                    <FormControl>
                      <div className="p-0.5 border border-dash border-neutral-400 relative h-[82px] w-[153px] group">
                        <Image
                          fill
                          alt="thumbnail"
                          src={video.thumbnailUrl || THUMBNAIL_PLACEHOLDER}
                          className="object-cover"
                        />

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              type="button"
                              size={"icon"}
                              className="bg-black/50 hover:bg-black/50 absolute top-1 right-1 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 duration-300 size-7"
                            >
                              <MoreVerticalIcon className="text-white" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="start" side="right">
                            <DropdownMenuItem
                              onClick={() => setThumbnailModalOpen(true)}
                            >
                              <ImagePlusIcon className="size-4 mr-1" /> Change
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                generateThumbnail.mutate({ videoId: video.id })
                              }
                            >
                              <Sparkle className="size-4 mr-1" /> AI Generated
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RotateCcw className="size-4 mr-1" /> Restore
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-y-8 lg:col-span-2">
              <div className="flex flex-col gap-4 bg-[#f9f9f9] rounded-xl overflow-hidden h-fit ">
                <div className="aspect-video overflow-hidden relative">
                  <VideoPlayer
                    playbackId={video.muxPlaybackId}
                    thumbnailUrl={video.thumbnailUrl}
                  />
                </div>

                <div className="p-4 flex flex-col gap-y-6">
                  <div className="flex justify-between items-center gap-x-2">
                    <div className="flex flex-col gap-y-1">
                      <p className="text-muted-foreground text-xs">
                        Video linl
                      </p>
                      <div className="flex items-center gap-x-2">
                        <Link href={`/videos/${video.id}`}>
                          <p className="line-clamp-1 text-sm text-blue-500">
                            {fullUrl}
                          </p>
                        </Link>
                        <Button
                          type="button"
                          variant={"ghost"}
                          size={"icon"}
                          className="shrink-0"
                          onClick={onCopy}
                          disabled={isCopied}
                        >
                          {isCopied ? <CopyCheckIcon /> : <CopyIcon />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-y-1">
                      <p className="text-muted-foreground text-xs">
                        VideoStatus
                      </p>
                      <p className="text-xs">
                        {snakeCaseToTile(video.muxStatus || "Preparing")}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-y-1">
                      <p className="text-muted-foreground text-xs">
                        Track Status
                      </p>
                      <p className="text-xs">
                        {snakeCaseToTile(video.muxTrackStatus || "No Audio")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visibility</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a visibility" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent defaultValue={video.visibility}>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}

function FormSectionSkeleton() {
  return (
    <>
      <p>Loading...</p>
    </>
  );
}

export default function FormSection({ videoId }: Props) {
  return (
    <Suspense fallback={<FormSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <FormSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
}
