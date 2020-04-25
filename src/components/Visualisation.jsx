import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {draw, createSimulation, zoom} from '../helpers/visualisation';
import {SLIDER_MAX} from './CaseFilterSlider';

export const Visualisation = ({nodes, links}) => {
  const vizContainer = useRef(null);
  const width = SLIDER_MAX * 2;
  const height = width / 2 - SLIDER_MAX / 5;
  useEffect(() => {
    if (vizContainer.current) {
      const simulation = createSimulation({nodes, links});
      d3.selectAll('svg > *').remove();
      d3.select(vizContainer.current)
        .attr('viewBox', [-width / 2, -height / 2, width, height])
        .call((svg) => draw(svg, simulation, {nodes, links}))
        .call((svg) => zoom(svg));
    }
  }, [width, height, nodes, links]);
  return <svg ref={vizContainer} />;
};
