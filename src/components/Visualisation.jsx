import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {draw, createSimulation} from '../helpers/visualisation';

export const Visualisation = ({nodes, links}) => {
  const vizContainer = useRef(null);
  const width = 9000;
  const height = 3500;
  useEffect(() => {
    if (vizContainer.current) {
      const simulation = createSimulation({nodes, links});
      d3.select(vizContainer.current)
        .attr('viewBox', [-width / 2, -height / 2, width, height])
        .call((svg) => draw(svg, simulation, {nodes, links}));
    }
  }, [nodes, links]);
  return <svg ref={vizContainer} />;
};
