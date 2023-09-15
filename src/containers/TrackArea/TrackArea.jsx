import React, { useCallback, useRef, useEffect, useMemo } from "react";
import Track from "./components/Track";
import Bogie from "./components/Bogie";

import TRACKS_INFO from "../../constants/tracks.json";


import { getLeftPos } from "../../utils/bogiePositionOnTrack.utils";
import { DEFAULT_TRACK_LEN } from "../../constants/constants";

const styles = {
  position: "relative",
  left:100,
  top:200,
};
const soundURL ="https://cdn.pixabay.com/audio/2021/09/06/audio_16da207a25.mp3"
const TrackArea = () => {
  const audio = useMemo(() => new Audio(soundURL),[]);
  const [startTrain, setStartTrain] = React.useState(false);
  const [tracks, setTracks] = React.useState(10);
  const [speed, setSpeed] = React.useState(2); 
  const [tracksIdOrder,setTracksIdOrder] = React.useState([0,1,2,3,4,5,6,7,8,9,6,7,8,9,6,7,8,9,6,7,8,9,6,7,8,9,6,7,8,9,])

  const tracksIdInfo = useMemo(() => {
    const tracksInfo = {};  
    Array(tracks)
      .fill(0)
      .forEach((_, i) => {
        tracksInfo[i] = {
          x: TRACKS_INFO[i].x,
          y: TRACKS_INFO[i].y,
          rotation: TRACKS_INFO[i].rotation,
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
  }, [audio]);

  const [bogieLeftPosition, setTrainLeftPosition] = React.useState(0);

  const step = useCallback(
    (timestamp) => {
      // if (timestamp > 30000) {
      //   return;
      // }
      leftPosRef.current += speed;
      if (leftPosRef.current > DEFAULT_TRACK_LEN) {
        leftPosRef.current = 0;
        trackRef.current = (trackRef.current + 1);
      }
      setTrainLeftPosition(leftPosRef.current);
      if (startTrain){requestRef.current= window.requestAnimationFrame(step)}
      else {
        trainSound(true)
        window.cancelAnimationFrame(requestRef.current)
      }
    },
    [speed, startTrain, tracks]
  );

  useEffect(() => {
    if (startTrain) {requestRef.current = window.requestAnimationFrame(step)
      trainSound()
    }else{
      window.cancelAnimationFrame(requestRef.current)
      trainSound(true)
    }
    // return () => cancelAnimationFrame(requestRef.current);
  }, [startTrain]);

  const getBogies = useCallback(
    (trackId) => {
      const currentLeftPos = bogieLeftPosition;
      const currentTrackId = trackRef.current < tracksIdOrder.length ? tracksIdOrder[trackRef.current] : 0;
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
    [bogieLeftPosition, tracksIdOrder]
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
      <div style={{marginTop:"500px"}}>
        {
          tracksIdOrder.map((trackId,i) => {
            return <input key={i} type="number" label={`track id for ${i}th order`} value={trackId} onChange={(e) => {
              const newTracksIdOrder = [...tracksIdOrder];
              newTracksIdOrder[i] = parseInt(e.target.value);
              setTracksIdOrder(newTracksIdOrder);   }}/>
          })
        }
      </div>
    </div>
  );
};

export default TrackArea;
