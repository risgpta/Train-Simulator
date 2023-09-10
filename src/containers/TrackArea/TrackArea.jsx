import React, { useCallback, useRef, useLayoutEffect, useMemo } from "react";
import Track from "./components/Track";
import Bogie from "./components/Bogie";

import trainSound from "../../audios/train-railroad-traffic-sound-8002.mp3";

import { getLeftPos } from "../../utils/bogiePositionOnTrack.utils";
import { DEFAULT_TRACK_LEN } from "../../constants/constants";

const styles = {
  position: "relative",
  left:0,
};
const soundURL ="https://cdn.pixabay.com/audio/2021/09/06/audio_16da207a25.mp3"
const TrackArea = () => {
  const audio = new Audio(soundURL);
  const [startTrain, setStartTrain] = React.useState(false);
  const [tracks, setTracks] = React.useState(6);
  const [speed, setSpeed] = React.useState(2); 

  const tracksIdInfo = useMemo(() => {
    const tracksInfo = {};
    Array(tracks)
      .fill(0)
      .forEach((_, i) => {
        tracksInfo[i] = {
          x: 200*i,
          y: 100,
          rotation: 0,
          settingsMode:false
        };
      });
    return tracksInfo;
  }, [tracks]);


  const [tracksInfo,setTracksInfo] = React.useState(tracksIdInfo)

  const leftPosRef = useRef(0);
  let requestRef = useRef();
  const trackRef = useRef(0);



  const trainSound = useCallback((flag = false) => {
    if(!flag)
    {audio.play();}
    else{audio.pause();}
  }, []);

  const [bogieLeftPosition, setTrainLeftPosition] = React.useState(0);

  const step = useCallback(
    (timestamp) => {
      // if (timestamp > 30000) {
      //   return;
      // }
      leftPosRef.current += speed;
      if (leftPosRef.current > DEFAULT_TRACK_LEN) {
        leftPosRef.current = 0;
        trackRef.current = (trackRef.current + 1) % tracks;
      }
      setTrainLeftPosition(leftPosRef.current);
      if (startTrain){requestRef.current= window.requestAnimationFrame(step)}
      else {
        trainSound(true)
        window.cancelAnimationFrame(requestRef.current)
      }
    },
    [speed, startTrain, tracks, trainSound]
  );

  useLayoutEffect(() => {
    if (startTrain) {requestRef.current = window.requestAnimationFrame(step)
      trainSound()
    }else{
      window.cancelAnimationFrame(requestRef.current)
      trainSound(true)
    }
    // return () => cancelAnimationFrame(requestRef.current);
  }, [startTrain, step, trainSound]);

  const getBogies = useCallback(
    (trackId) => {
      const currentLeftPos = bogieLeftPosition;
      const currentTrackId = trackRef.current;

      const { left, bogies } = getLeftPos(
        currentLeftPos,
        currentTrackId,
        trackId
      );

      const bogiesPositions = [];

      Array(bogies)
        .fill(0)
        .forEach((_, i) => {
          bogiesPositions.push(
            <Bogie key={left + i} bogieLeftPosition={left + i} id={i}/>
          );
        });

    
      return <>{bogiesPositions}</>;
    },
    [bogieLeftPosition]
  );

  

  const TracksList = useCallback(() => {
    const list = Array(tracks).fill(0);
    return (
      <>
        {list.map((_, i) => (
          <Track key={i} id={i} tracksInfo={tracksInfo} train={getBogies(i)} setTracksInfo={setTracksInfo} />
        ))}
      </>
    );
  }, [tracks, tracksInfo, getBogies]);



  return (
    <div style={styles}>
      tracks:{tracks}
      <input
        type="range"
        value={tracks}
        onChange={(e) => setTracks(parseInt(e.target.value))}
        min={1}
        max={10}
      />
      speed:{speed}
      <input
        type="range"
        value={speed}
        onChange={(e) => setSpeed(parseInt(e.target.value))}
        min={1}
        max={10}
      />
      <button onClick={() => setStartTrain(!startTrain)}>
        {startTrain ? "Stop" : "Start"}
      </button>
      {leftPosRef.current}
      <TracksList />
    </div>
  );
};

export default TrackArea;
