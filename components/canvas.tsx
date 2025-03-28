"use client";

import { Media } from "@/types/type";
import { Rnd } from "react-rnd";
import Image from "next/image";

export default function Canvas({
  images,
  videos,
  setImages,
  setVideos,
  isPlaying,
  currentTime,
}: {
  images: Media[];
  videos: Media[];
  setImages: React.Dispatch<React.SetStateAction<Media[]>>;
  setVideos: React.Dispatch<React.SetStateAction<Media[]>>;
  isPlaying: boolean;
  currentTime: number;
}) {
  const updateImagePosition = (type: string, path: string, x: number, y: number) => {
    if (type === "image") {
      setImages(
        images.map((img) =>
          img.path === path ? { ...img, xPosition: x, yPosition: y } : img
        )
      );
    } else {
      setVideos(
        videos.map((vid) =>
          vid.path === path ? { ...vid, xPosition: x, yPosition: y } : vid
        )
      );
    }
  };

  return (
    <div className="relative w-[900px] h-[500px] bg-[#2a2a2a] border border-[#444] rounded-md overflow-hidden">
      {isPlaying ? (
        <div className="absolute inset-0">
          {images.map((img) => (
            <div key={img.path}>
              {currentTime >= img.startTime && currentTime <= img.endTime && (
                <Rnd
                  default={{
                    x: img.xPosition,
                    y: img.yPosition,
                    width: img.width,
                    height: img.height,
                  }}
                  size={{ width: img.width, height: img.height }}
                  disableDragging
                >
                  <Image
                    src={img.path}
                    alt="uploaded"
                    width={img.width || 0}
                    height={img.height || 0}
                    className="object-cover rounded-md border border-transparent hover:border-blue-500 cursor-pointer"
                  />
                </Rnd>
              )}
            </div>
          ))}

          {videos.map((vid) => (
            <div key={vid.path}>
              {currentTime >= vid.startTime && currentTime <= vid.endTime && (
                <Rnd
                  default={{
                    x: vid.xPosition,
                    y: vid.yPosition,
                    width: vid.width,
                    height: vid.height,
                  }}
                  disableDragging
                >
                  <video
                    src={vid.path}
                    className={`w-${vid.width} h-${vid.height} cursor-pointer`}
                    width={vid.width}
                    height={vid.height}
                    controls
                  />
                </Rnd>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="absolute inset-0">
          {images.map((img) => (
            <Rnd
              key={img.path}
              default={{
                x: img.xPosition,
                y: img.yPosition,
                width: img.width,
                height: img.height,
              }}
              size={{ width: img.width, height: img.height }}
              onDragStop={(e, d) => updateImagePosition("image", img.path, d.x, d.y)}
              onResizeStop={(e,direction, ref, delta, position) => {
                const newWidth = parseInt(ref.style.width, 10);
                const newHeight = parseInt(ref.style.height, 10);
                setImages((prev) =>
                  prev.map((image) =>
                    image.path === img.path
                      ? {
                          ...image,
                          width: newWidth,
                          height: newHeight,
                          xPosition: position.x,
                          yPosition: position.y,
                        }
                      : image
                  )
                );
              }}
            >
              <Image
                src={img.path}
                alt="uploaded"
                height={img.height || 0}
                width={img.width || 0}
                className="object-cover rounded-md border border-transparent hover:border-blue-500 cursor-move w-[100%] h-[100%]"
              />
            </Rnd>
          ))}

          {videos.map((vid) => (
            <Rnd
              key={vid.path}
              default={{
                x: vid.xPosition,
                y: vid.yPosition,
                width: vid.width,
                height: vid.height,
              }}
              onDragStop={(e, d) => updateImagePosition("video", vid.path, d.x, d.y)}
              onResizeStop={(e,direction, ref, delta, position) => {
                const newWidth = parseInt(ref.style.width, 10);
                const newHeight = parseInt(ref.style.height, 10);
                setVideos((prev) =>
                  prev.map((video) =>
                    video.path === vid.path
                      ? {
                          ...video,
                          width: newWidth,
                          height: newHeight,
                          xPosition: position.x,
                          yPosition: position.y,
                        }
                      : video
                  )
                );
              }}
            >
              <video
                src={vid.path}
                className={`w-${vid.width} h-${vid.height} cursor-move`}
                controls
                width={vid.width}
                height={vid.height}
                autoPlay={true}
              />
            </Rnd>
          ))}
        </div>
      )}
    </div>
  );
}
