"use client";

import { Media } from "@/types/type";
import { Dropzone, FileWithPath } from "@mantine/dropzone";

export default function UploadButton({
  images,
  videos,
  setImages,
  setVideos,
}: {
  images: Media[];
  videos: Media[];
  setImages: React.Dispatch<React.SetStateAction<Media[]>>;
  setVideos: React.Dispatch<React.SetStateAction<Media[]>>;
}) {
  function handleUpload(files: FileWithPath[]) {
    const file = files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);

      if (file.type.startsWith("image/")) {
        setImages([
          ...images,
          {
            type: "image",
            path: fileURL,
            xPosition: 0,
            yPosition: 0,
            height: 100,
            width: 100,
            startTime: 0,
            endTime: 5,
          },
        ]);
      } else if (file.type.startsWith("video/")) {
        setVideos([
          ...videos,
          {
            type: "video",
            path: fileURL,
            xPosition: 0,
            yPosition: 0,
            height: 400,
            width: 400,
            startTime: 0,
            endTime: 5,
          },
        ]);
      }
    }
  }

  return (
    <div>
      <Dropzone
        onDrop={(files) => handleUpload(files)}
        className="cursor-pointer w-full h-32 border-dashed border-2 border-gray-600 rounded-lg flex flex-col items-center justify-center text-center text-gray-400 hover:border-blue-400 transition-colors"
      >
        <p className="text-lg font-semibold">Upload a File</p>
        <p className="text-sm">
          Drag & drop a file <br /> or{" "}
          <span className="text-blue-400 underline cursor-pointer">
            import from a link
          </span>
        </p>
      </Dropzone>
    </div>
  );
}
