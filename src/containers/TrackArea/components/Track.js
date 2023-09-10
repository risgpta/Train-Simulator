import React, { useCallback, useMemo } from "react";
import { DEFAULT_TRACK_LEN } from "../../../constants/constants";

export default function Track({ id, train, setTracksInfo, tracksInfo }) {
  const [len, setLen] = React.useState(DEFAULT_TRACK_LEN);

  const SettingsModeContainerStyles = useMemo(() => {
    return {
      position: "fixed",
      top: "50%",
      left: "35%",
      width: "600px",
      height: "50px",
      backgroundColor: "white",
      transition: "all 0.5s ease-in-out"
    };
  }, []);

  const styles = useMemo(() => {
    return {
      position: "absolute",
      top: `${tracksInfo[id]?.y ?? 0}px`,
      left: `${tracksInfo[id]?.x ?? 0}px`,
      width: `${len}px`,
      height: "10px",
      backgroundColor: "brown" /* For browsers that do not support gradients */,
      backgroundImage:
        "repeating-linear-gradient(90deg,white,brown 0%,black 2%)",
      transform: `rotate(${tracksInfo[id]?.rotation ?? 0}deg)`
    };
  }, [id, len, tracksInfo]);

  const handleModfiyTracksInfo = useCallback(
    (changedInfo) => {
      setTracksInfo((prev) => {
        const newTracksInfo = { ...prev };
        const { x, y, rotation } = changedInfo;
        newTracksInfo[id] = {
          ...newTracksInfo[id],
          x,
          y,
          rotation
        };
        return newTracksInfo;
      });
    },
    [id, setTracksInfo]
  );

  const handleSettingMode = useCallback(
    (e) => {
      setTracksInfo((prev) => {
        const newTracksInfo = { ...prev };
        newTracksInfo[id] = {
          ...newTracksInfo[id],
          settingsMode: true
        };
        return newTracksInfo;
      });
    },
    [id, setTracksInfo]
  );

  const SettingsModeContainer = useCallback(() => {
    return (
      <div style={SettingsModeContainerStyles}>
        <h6> track number : {id + 1}</h6>
        X:{tracksInfo[id].x}
        <input
          type="range"
          value={tracksInfo[id].x}
          onChange={(e) =>
            handleModfiyTracksInfo({
              x: e.target.value,
              y: tracksInfo[id].y,
              rotation: tracksInfo[id].rotation
            })
          }
          min={0}
          max={window.innerWidth}
        />
        Y:{tracksInfo[id].y}
        <input
          type="range"
          value={tracksInfo[id].y}
          onChange={(e) =>
            handleModfiyTracksInfo({
              y: e.target.value,
              x: tracksInfo[id].x,
              rotation: tracksInfo[id].rotation
            })
          }
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
        Angle:{tracksInfo[id].rotation}
        <input
          type="range"
          value={tracksInfo[id].rotation}
          onChange={(e) =>
            handleModfiyTracksInfo({
              y: tracksInfo[id].y,
              x: tracksInfo[id].x,
              rotation: e.target.value
            })
          }
          min={0}
          max={360}
        />
      </div>
    );
  }, [
    SettingsModeContainerStyles,
    handleModfiyTracksInfo,
    id,
    len,
    tracksInfo
  ]);

  const closeModal = useCallback(() => {
    setTracksInfo((prev) => {
      const newTracksInfo = { ...prev };
      newTracksInfo[id] = {
        ...newTracksInfo[id],
        settingsMode: false
      };
      return newTracksInfo;
    });
  }, [id, setTracksInfo]);

  const SettingsJSX = useCallback(() => {
    if (tracksInfo[id]?.settingsMode) {
      return <SettingsModeContainer />;
    } else return null;
  }, [id, tracksInfo]);

  const CloseJSX = useCallback(() => {
    if (tracksInfo[id]?.settingsMode) {
      return <h5 onClick={closeModal}>CLOSE MODAL</h5>;
    } else return null;
  }, [closeModal, id, tracksInfo]);

  return (
    <>
      <SettingsJSX />
      <CloseJSX />
      <div style={styles} onClick={handleSettingMode}>
        {train}
      </div>
    </>
  );
}
