import React, { useCallback, useMemo } from "react";
import {
  DEFAULT_TRACK_LEN,
  DEFAULT_TRACK_Y
} from "../../../constants/constants";

const SettingsModeContainerStyles = {
  position: "fixed",
  top: "50%",
  left: "35%",
  width: "600px",
  height: "50px",
  backgroundColor: "rgba(45,0,0,0.5)",
  transition: "all 0.5s ease-in-out",
  zIndex: "1"
};

export default function Track({
  id,
  train,
  initalX = DEFAULT_TRACK_LEN,
  initialY = DEFAULT_TRACK_Y
}) {
  const [x, setX] = React.useState(initalX);
  const [y, setY] = React.useState(initialY);
  const [len, setLen] = React.useState(DEFAULT_TRACK_LEN);
  const [rotation, setRotation] = React.useState(0); // [0, 90, 180, 270
  const [settingMode, setSettingMode] = React.useState(false);

  const handleSettingMode = useCallback(
    (e) => {
      e.stopPropagation();
      setSettingMode(!settingMode);
    },
    [settingMode]
  );

  const styles = useMemo(() => {
    return {
      position: "absolute",
      top: `${y}px`,
      left: `${x}px`,
      width: `${len}px`,
      height: "10px",
      backgroundColor: "brown" /* For browsers that do not support gradients */,
      backgroundImage:
        "repeating-linear-gradient(90deg,white,brown 0%,black 2%)",
      transform: `rotate(${rotation}deg)`
    };
  }, [y, x, len, rotation]);

  const SettingsModeContainer = useCallback(() => {
    return (
      <div
        style={SettingsModeContainerStyles}
        onClick={() => setSettingMode(false)}
      >
        <h6> track number : {id + 1}</h6>
        X:{x}
        <input
          type="range"
          value={x}
          onChange={(e) => setX(e.target.value)}
          min={0}
          max={window.innerWidth}
        />
        Y:{y}
        <input
          type="range"
          value={y}
          onChange={(e) => setY(e.target.value)}
          min={0}
          max={window.innerHeight}
        />
        LEN:{len}
        <input
          type="range"
          value={len}
          onChange={(e) => setLen(e.target.value)}
          min={1}
          max={window.innerHeight}
        />
        Angle:{rotation}
        <input
          type="range"
          value={rotation}
          onChange={(e) => setRotation(e.target.value)}
          min={0}
          max={360}
        />
      </div>
    );
  }, [id, len, rotation, x, y]);

  const TrainComponent = useCallback(() => train, [train]);

  return (
    <>
      {settingMode && <SettingsModeContainer />}
      <div style={styles} onClick={handleSettingMode}>
        <TrainComponent />
      </div>
    </>
  );
}
