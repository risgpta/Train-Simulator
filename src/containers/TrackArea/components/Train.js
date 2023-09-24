import React, { useCallback, useRef, useEffect, useMemo } from "react";
import Bogie from "./Bogie";

import TRACKS_INFO from "../../../constants/tracks.json";

import { getLeftPos } from "../../../utils/bogiePositionOnTrack.utils";
import { DEFAULT_TRACK_LEN } from "../../../constants/constants";

const styles = {
  position: "relative",
  left: 100,
  top: 200
};
const soundURL =
  "https://cdn.pixabay.com/audio/2021/09/06/audio_16da207a25.mp3";
const Train = ({
  trackIndex,
  delay = 0,
  color = "blue",
  trainSpeed = 5,
  tracksOrder = []
}) => {
  const audio = useMemo(() => new Audio(soundURL), []);

  const [startTrain, setStartTrain] = React.useState(false);
  const [tracks, setTracks] = React.useState(10);
  const [tracksIdOrder, setTracksIdOrder] = React.useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0
  ]);

  const tracksIdInfo = useMemo(() => {
    const tracksInfo = {};
    Array(tracks)
      .fill(0)
      .forEach((_, i) => {
        tracksInfo[i] = {
          x: TRACKS_INFO[i].x,
          y: TRACKS_INFO[i].y,
          rotation: TRACKS_INFO[i].rotation,
          settingsMode: false
        };
      });
    return tracksInfo;
  }, [tracks]);

  const [tracksInfo, setTracksInfo] = React.useState(tracksIdInfo);

  const leftPosRef = useRef(0);
  let requestRef = useRef();
  const trackRef = useRef(0);

  const trainSound = useCallback(
    (flag = false) => {
      if (!flag) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    [audio]
  );

  const [bogieLeftPosition, setTrainLeftPosition] = React.useState(0);

  const step = useCallback(
    (timestamp) => {
      // if (timestamp > 30000) {
      //   return;
      // }
      leftPosRef.current += trainSpeed;
      if (leftPosRef.current > DEFAULT_TRACK_LEN) {
        leftPosRef.current = 0;
        trackRef.current = trackRef.current + 1;
      }
      setTrainLeftPosition(leftPosRef.current);
      if (startTrain) {
        requestRef.current = window.requestAnimationFrame(step);
      } else {
        trainSound(true);
        window.cancelAnimationFrame(requestRef.current);
      }
    },
    [trainSpeed, startTrain, trainSound]
  );

  useEffect(() => {
    if (startTrain) {
      requestRef.current = window.requestAnimationFrame(step);
    } else {
      setTimeout(() => {
        setStartTrain(true);
        // trainSound();
      }, delay);
      window.cancelAnimationFrame(requestRef.current);
      // trainSound(true);
    }
    // return () => cancelAnimationFrame(requestRef.current);
  }, [startTrain]);

  const getBogies = useCallback(
    (trackId) => {
      const currentLeftPos = bogieLeftPosition;
      const currentTrackId =
        trackRef.current < tracksIdOrder.length
          ? tracksIdOrder[trackRef.current]
          : 0;
      const { left, bogies } = getLeftPos(
        currentLeftPos,
        currentTrackId,
        trackId
      );

      const bogiesPositions = [];
      console.log(bogies, trackId, currentLeftPos, currentTrackId);
      Array(bogies)
        .fill(0)
        .forEach((_, i) => {
          bogiesPositions.push(
            <Bogie
              key={left + i}
              bogieLeftPosition={left + i}
              id={i}
              color={color}
            />
          );
        });

      return <>{bogiesPositions}</>;
    },
    [bogieLeftPosition, color, tracksIdOrder]
  );

  return getBogies(trackIndex);

  // return (
  //   <div style={styles}>
  //     tracks:{tracks}
  //     <input
  //       type="range"
  //       value={tracks}
  //       onChange={(e) => setTracks(parseInt(e.target.value))}
  //       min={1}
  //       max={10}
  //     />
  //     trainSpeed:{trainSpeed}
  //     <input
  //       type="range"
  //       value={trainSpeed}
  //       onChange={(e) => setSpeed(parseInt(e.target.value))}
  //       min={1}
  //       max={10}
  //     />
  //     <button onClick={() => setStartTrain(!startTrain)}>
  //       {startTrain ? "Stop" : "Start"}
  //     </button>
  //   </div>
  // );
};

export default Train;
