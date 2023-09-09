import { DEFAULT_TRACK_LEN, TRAIN_LEN } from "../constants/constants";

export const getLeftPos = (currentLeftPos, currentTrackId, trackId) => {
  let left = currentLeftPos;
  let numberOfBogies = TRAIN_LEN;
  const limitIndexOnTrack = DEFAULT_TRACK_LEN - TRAIN_LEN;
  if (left < limitIndexOnTrack && currentTrackId === trackId) {
    return { left, bogies: numberOfBogies };
  } else if (left >= limitIndexOnTrack) {
    const onCurrentTracKBogies = DEFAULT_TRACK_LEN - left;
    const leftForNextTrack = 0;
    const onNextTrackBogies = TRAIN_LEN - onCurrentTracKBogies;
    if (currentTrackId + 1 === trackId) {
      return { left: leftForNextTrack, bogies: onNextTrackBogies };
    } else if (currentTrackId === trackId) {
      return { left, bogies: onCurrentTracKBogies };
    } else {
      return { left: 0, bogies: 0 };
    }
  } else {
    return { left: 0, bogies: 0 };
  }
};
