import React, { useCallback } from "react";
import { DEFAULT_TRACK_LEN, TRAIN_LEN } from "../../../constants/constants";

const bogieStyle = {
  position: "absolute",
  width: "1px",
  height: "10px"
};

export default function Bogie({ bogieLeftPosition, id, color }) {
  const BogieComponent = useCallback(() => {
    return (
      <div
        style={{
          ...bogieStyle,
          left: bogieLeftPosition,
          backgroundColor: color
        }}
      ></div>
    );
  }, [bogieLeftPosition, color]);

  return <BogieComponent />;
}
