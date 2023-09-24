import { DEFAULT_TRACK_LEN, TRAIN_LEN } from "../constants/constants";

export const getRadian = (angle) => {
  return (angle * Math.PI) / 180;
};

export const getAllTrainsAndTracksConfig = () => {
  const leftPos = 200;
  const topPos = 10;
  const trackLen = DEFAULT_TRACK_LEN;
  const default_Angle_30 = 30;
  const default_Angle_90 = 90;
  const default_Angle_150 = 150;
  const default_Angle_180 = 180;
  const default_Angle_210 = 210;
  const default_Angle_270 = 270;
  const default_Angle_330 = 330;
  return [
    {
      x: leftPos + 0 * trackLen,
      y: topPos,
      rotation: 0
    },
    {
      x: leftPos + 1 * trackLen,
      y: topPos,
      rotation: 0
    },
    {
      x: leftPos + 2 * trackLen,
      y: topPos,
      rotation: default_Angle_30
    },
    {
      x:
        leftPos +
        2 * trackLen +
        trackLen * Math.cos(getRadian(default_Angle_30)),
      y: topPos + trackLen * Math.sin(getRadian(default_Angle_30)),
      rotation: default_Angle_90
    },
    {
      x:
        leftPos +
        2 * trackLen +
        trackLen * Math.cos(getRadian(default_Angle_30)),
      y: topPos + trackLen + trackLen * Math.sin(getRadian(default_Angle_30)),
      rotation: default_Angle_150
    },
    {
      x: leftPos + 2 * trackLen,
      y:
        topPos +
        trackLen +
        2 * trackLen * Math.sin(getRadian(default_Angle_30)),
      rotation: default_Angle_180
    },
    {
      x: leftPos + 1 * trackLen,
      y:
        topPos +
        trackLen +
        2 * trackLen * Math.sin(getRadian(default_Angle_30)),
      rotation: default_Angle_180
    },
    {
      x: leftPos,
      y:
        topPos +
        trackLen +
        2 * trackLen * Math.sin(getRadian(default_Angle_30)),
      rotation: default_Angle_210
    },
    {
      x: leftPos - trackLen * Math.cos(getRadian(default_Angle_30)),
      y: topPos + trackLen + trackLen * Math.sin(getRadian(default_Angle_30)),
      rotation: default_Angle_270
    },
    {
      x: leftPos - trackLen * Math.cos(getRadian(default_Angle_30)),
      y: topPos + trackLen * Math.sin(getRadian(default_Angle_30)),
      rotation: default_Angle_330
    }
  ];
};
