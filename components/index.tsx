"use client";

import { useEffect, useState } from "react";
import Canvas from "./canvas";
import Menu from "./menu";
import TimeLine from "./timebar";
import { Media } from "@/types/type";

export default function Editor() {
  const [images, setImages] = useState<Media[]>([]);
  const [videos, setVideos] = useState<Media[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    console.log(images);
    console.log(videos);
  }, [images, videos]);

  return (
    // Full-screen, dark background, white text
    <div className="flex flex-col h-screen w-screen bg-[#181818] text-white font-sans">
      {/* Top row: left sidebar + center canvas */}
      <div className="flex flex-row flex-1 overflow-hidden">
        {/* Menu on the left */}
        <Menu
          images={images}
          videos={videos}
          setImages={setImages}
          setVideos={setVideos}
        />

        {/* Canvas in the center */}
        <div className="flex-1 flex items-center justify-center">
          <Canvas
            images={images}
            videos={videos}
            setImages={setImages}
            setVideos={setVideos}
            isPlaying={isPlaying}
            currentTime={currentTime}
          />
        </div>
      </div>

      {/* Bottom timeline */}
      <div className="h-24 border-t border-[#333]">
        <TimeLine
          currentTime={currentTime}
          isPlaying={isPlaying}
          setCurrentTime={setCurrentTime}
          setIsPlaying={setIsPlaying}
        />
      </div>
    </div>
  );
}
