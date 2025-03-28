"use client";

import { Media } from "@/types/type";
import { TextInput, Paper } from "@mantine/core";
import { Video } from "lucide-react";
import Image from "next/image";

export default function ImageList({
  media,
  setMedia,
}: {
  media: Media;
  setMedia: React.Dispatch<React.SetStateAction<Media[]>>;
}) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const number = parseInt(e.currentTarget.value, 10);
    if (isNaN(number)) e.target.value = "0";

    setMedia((prev) =>
      prev.map((item) => {
        if (item.path === media.path) {
          return { ...item, [type]: isNaN(number) ? 0 : number };
        }
        return item;
      })
    );
  };

  return (
    <div className="bg-[#2a2a2a] rounded-md p-2 border border-[#444]">
      <Paper style={{ height: 60 }} className="overflow-hidden bg-[#2a2a2a]">
        <div className="flex flex-row items-center gap-2">
          {
            media.type === "video" ? (
              <Video size={20} color="white" />
            ) : (
              <Image src={media.path} alt="image" width={50} height={50} />
            )}
          
          {/* <Image
            src={media.path}
            height={50}
            width={50}
            alt="image"
            className="rounded-md border border-[#444]"
          /> */}
          <div className="flex flex-row gap-4">
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between items-center">
                <p className="text-sm">Width:</p>
                <TextInput
                  size="xs"
                  value={media.width}
                  onChange={(e) => handleChange(e, "width")}
                  className="w-16 bg-[#333] text-white"
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">Height:</p>
                <TextInput
                  size="xs"
                  value={media.height}
                  onChange={(e) => handleChange(e, "height")}
                  className="w-16 bg-[#333] text-white"
                />
              </div>
            </div>

            {/* Right column: start & end */}
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between items-center">
                <p className="text-sm">Start:</p>
                <TextInput
                  size="xs"
                  value={media.startTime}
                  onChange={(e) => handleChange(e, "startTime")}
                  className="w-16 bg-[#333] text-white"
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">End:</p>
                <TextInput
                  size="xs"
                  value={media.endTime}
                  onChange={(e) => handleChange(e, "endTime")}
                  className="w-16 bg-[#333] text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}
