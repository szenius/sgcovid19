import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {draw, zoom, createSimulation} from '../helpers/visualisation';

export const Visualisation = ({nodes, links}) => {
  const vizContainer = useRef(null);
  const width = 8192;
  const height = 4096;
  useEffect(() => {
    if (vizContainer.current) {
      const simulation = createSimulation({nodes, links});
      d3.select(vizContainer.current)
        .attr('viewBox', [-width / 2, -height / 2, width, height])
        .call((svg) => draw(svg, simulation, {nodes, links}))
        .call((svg) => zoom(svg));
    }
  }, [nodes, links]);
  return <svg ref={vizContainer} />;
};
