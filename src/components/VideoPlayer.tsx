import { useEffect, useRef } from "react";

interface VideoPlayerProps {
  src: string;
  width?: string;
  height?: string;
}

declare global {
  interface Window { 
    onYouTubeIframeAPIReady: () => void 
  }
}




const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  width = "480px",
  height = "270px",
}) => {
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    let player: YT.Player | null = null;

    const loadYouTubeAPI = () => {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = initializePlayer;
    };

    const initializePlayer = () => {
      player = new window.YT.Player(videoElement!, {
        videoId: getYouTubeVideoId(src),
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      loadYouTubeAPI();
    }

    return () => {
      player?.destroy();
    };
  }, [src]);

  // Extracts the video ID from the YouTube URL
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&]+)/i
    );
    return match ? match[1] : "";
  };

  return (
    <div
      ref={videoRef}
      style={{
        width,
        height,
      }}
    />
  );
};

export default VideoPlayer;
