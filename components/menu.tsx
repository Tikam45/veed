"use client";

import { Media } from "@/types/type";
import UploadButton from "./uploadButton";
import ImageList from "./imageList";

export default function Menu({
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
  return (
    // Fixed width, dark background, subtle right border
    <div className="w-84 bg-[#1E1E1E] border-r border-[#333] flex flex-col p-4">
      {/* Upload section at the top */}
      <div className="mb-4">
        <UploadButton
          images={images}
          videos={videos}
          setImages={setImages}
          setVideos={setVideos}
        />
      </div>

      {/* Media list scroll area */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {images.map((image) => (
          <ImageList key={image.path} setMedia={setImages} media={image} />
        ))}
        {videos.map((video) => (
          <ImageList key={video.path} setMedia={setVideos} media={video} />
        ))}
      </div>
    </div>
  );
}
