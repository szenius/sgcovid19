import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { draw, zoom, createSimulation } from "../helpers/vizHelper.js";

export const Visualisation = (data) => {
  const vizContainer = useRef(null);
  const width = 8192;
  const height = 4096;
  useEffect(() => {
    if (vizContainer.current) {
      const { nodes, edges } = data.data;
      const simulation = createSimulation({ nodes, links: edges });
      d3.select(vizContainer.current)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .call((svg) => draw(svg, simulation, { nodes, links: edges }))
        .call((svg) => zoom(svg));
    }
  }, [data]);
  return <svg ref={vizContainer} />;
};
