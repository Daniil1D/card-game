import { useRef, useState } from "react";
import { Button } from "../../ui/button/Button";
import { Pause, Play } from "lucide-react";

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const hendlePlayPause = () => {
    if (!audioRef.current) return null;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Button
      className="absolute right-9 bottom-20 z-10"
      variant="gray"
      isCircle
      onClick={hendlePlayPause}
    >
      <audio ref={audioRef} loop className="opacity-0">
        <source src="/assets/music/WEGAS.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      {isPlaying ? <Pause /> : <Play />}
    </Button>
  );
}
