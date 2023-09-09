import React, { useCallback } from "react";
import { DEFAULT_TRACK_LEN, TRAIN_LEN } from "../../../constants/constants";

const bogieStyle = {
  position: "absolute",
  width: "1px",
  height: "10px"
};

export default function Bogie({ bogieLeftPosition, id }) {
  const BogieComponent = useCallback(() => {
    return (
      <div
        style={{
          ...bogieStyle,
          left: bogieLeftPosition,
          backgroundColor: "#2a2ad5"
        }}
      ></div>
    );
  }, [bogieLeftPosition]);

  return <BogieComponent />;
}
