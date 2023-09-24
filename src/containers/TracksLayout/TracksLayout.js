import React, { useCallback, useMemo } from "react";

import Track from "../TrackArea/components/Track";
import Train from "../TrackArea/components/Train";
import { getAllTrainsAndTracksConfig } from "../../utils/allTrainsAndTracks.utils";

const styles = {
  position: "relative",
  left: 100,
  top: 50
};

const TracksLayout = () => {
  const TRACKS_INFO = getAllTrainsAndTracksConfig();
  const [tracksInfo, setTracksInfo] = React.useState(TRACKS_INFO);

  return (
    <div style={styles}>
      {Array(TRACKS_INFO.length)
        .fill(0)
        .map((_, i) => (
          <Track
            key={i}
            id={i}
            tracksInfo={tracksInfo}
            setTracksInfo={setTracksInfo}
            trains={[
              <Train trackIndex={i} />,
              <Train
                trackIndex={i}
                delay={1000}
                color="yellow"
                trainSpeed={2}
              />,
              <Train trackIndex={i} delay={2000} color="red" trainSpeed={4} />,
              <Train
                trackIndex={i}
                delay={3000}
                color="lightgreen"
                trainSpeed={7}
              />,
              <Train
                trackIndex={i}
                delay={4000}
                color="orange"
                trainSpeed={1}
              />
            ]}
          />
        ))}
    </div>
  );
};

export default TracksLayout;
