import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { draw, zoom } from "./vizHelpers.js";

export const Visualisation = (data) => {
  const vizContainer = useRef(null);
  const width = 8192;
  const height = 4096;
  useEffect(() => {
    if (vizContainer.current) {
      d3.select(vizContainer.current)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .call((container) => draw(container, data))
        .call((container) => zoom(container));
    }
  }, [data]);
  return <svg ref={vizContainer} />;
};
