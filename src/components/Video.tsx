import React, { useRef, useState } from "react";
import { formatContent } from "src/pages/Homepage";
import { useIsVisible } from "react-is-visible";

export const VideoContainer: React.FC<{
  videoUrl: string;
  slideContent: string;
}> = ({ videoUrl, slideContent }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLDivElement>(null);
  const isVideoVisible = useIsVisible(videoRef);

  return (
    <div className="scrolly-container is-flex is-flex-direction-column is-align-items-center is-justify-content-space-between">
      <div className="scrolly-image" ref={videoRef}>
        {isVideoVisible && (
          <video
            autoPlay
            loop
            playsInline
            muted={isMuted}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="scrolly-caption is-flex is-flex-direction-column is-align-items-center is-justify-content-center p-3 mx-2">
        {formatContent(slideContent)}
        <button
          className="button has-background-black has-text-white my-3"
          onClick={() => setIsMuted(false)}
          style={{
            width: "100%",
            maxWidth: "300px",
          }}
        >
          LISTEN TO AUDIO
        </button>
        <div className="copy is-italic mt-4 is-hidden-tablet mb-0">
          We recommend rotating your phone lengthwise to see this one.
        </div>
      </div>
    </div>
  );
};
