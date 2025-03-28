
"use client"

import { Pause, Play } from "lucide-react";
import { useEffect, useRef } from "react";


export default function TimeLine({currentTime, isPlaying, setCurrentTime, setIsPlaying}:{
    currentTime: number;
    isPlaying: boolean;
    setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}){
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        if (isPlaying) {
          timerRef.current = setInterval(() => {
            setCurrentTime((prevTime) => prevTime + 1);
          }, 1000);
        } else {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
        }
    
        return () => clearInterval(timerRef.current as NodeJS.Timeout);
      }, [isPlaying]);
    
    return (
        <div className=" w-screen h-16 bg-black-200 flex items-center justify-center">
            {currentTime}
            {
                isPlaying && <Pause onClick={() => {
                    setIsPlaying(false);
                    setCurrentTime(0);
                }}/>
            }
            {
                !isPlaying && <Play onClick={()=>{
                    setIsPlaying(true);
                    setCurrentTime(0);
                }}/>
            }
        </div>
    )
}