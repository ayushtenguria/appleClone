import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setloadedData] = useState([]);

  const { isEnd, isLastVideo, startPlay, isPlaying, videoId } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleLoadedMetaData = (i, e) => setloadedData((pre) => [...pre, e]);

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);
          if (progress != currentProgress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                  ? "10vw"
                  : "4vw",
            });
            gsap.to(span[videoId], {
              width: `(${currentProgress}%)`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId === 0) {
        anim.restart();
      }

      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;
      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((pre) => ({ ...pre, isLastVideo: false, videoId: 0 }));
        break;
      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => {
          return (
            <div key={list.id} id="slider" className="sm:pr-20 pr-10">
              <div className="video-carousel_container">
                <div className="h-full w-full flex-center overflow-hidden rounded-3xl bg-black">
                  <video
                    id="video"
                    playsInline={true}
                    preload="auto"
                    muted
                    className={`${
                      list.id === 2 && "translate-x-44"
                    } pointer-events-none `}
                    onEnded={() => {
                      i !== 3
                        ? handleProcess("video-end", i)
                        : handleProcess("video-last");
                    }}
                    ref={(el) => (videoRef.current[i] = el)}
                    onPlay={() => {
                      setVideo((prevVideo) => ({
                        ...prevVideo,
                        isPlaying: true,
                      }));
                    }}
                    onLoadedMetadata={(e) => handleLoadedMetaData(e, i)}
                  >
                    <source src={list.video} type="video/mp4" />
                  </video>
                </div>
                <div className="absolute left-[5%] top-12 z-10">
                  {list.textLists.map((text) => {
                    return (
                      <div
                        key={text}
                        className="md:text-2xl text-xl font-medium"
                      >
                        <p>{text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 bg-gray-300 rounded-full backdrop-blur px-7">
          {videoRef.current.map((_, i) => {
            return (
              <>
                <span
                  key={i}
                  ref={(el) => (videoDivRef.current[i] = el)}
                  className="mx-2 h-3 w-3 bg-gray-200 rounded-full cursor-pointer relative"
                >
                  <span
                    ref={(el) => (videoSpanRef.current[i] = el)}
                    className="absolute h-full w-full rounded-full"
                  />
                </span>
              </>
            );
          })}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "pause" : "pause"}
            onClick={
              isLastVideo
                ? () => {
                    handleProcess("video-reset");
                  }
                : !isPlaying
                ? () => {
                    handleProcess("play");
                  }
                : () => {
                    "pause";
                  }
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
