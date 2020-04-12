import React, { useEffect, useRef } from "react";
import data from "./data/graph.json";
import * as d3 from "d3";
import virus from "./images/coronavirus.png";
import recoveredFemale from "./images/female_recovered.png";
import recoveredMale from "./images/male_recovered.png";
import sickFemale from "./images/female_patient.png";
import sickMale from "./images/male_patient.png";

export const Graph = () => {
  const vizContainer = useRef(null);
  const width = 2048;
  const height = 2048;
  useEffect(() => {
    if (vizContainer.current) {
      const chart = selection => {
        const drag = simulation => {
          const dragstarted = d => {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          };

          const dragged = d => {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
          };

          const dragended = d => {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          };

          return d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
        };

        const links = data.edges.map(d => ({
          ...d,
          ...Object.create(d)
        }));
        const nodes = data.nodes.map(d => ({
          ...d,
          ...Object.create(d)
        }));

        const simulation = d3
          .forceSimulation(nodes)
          .force(
            "link",
            d3.forceLink(links).id(d => d.id)
          )
          .force("charge", d3.forceManyBody())
          .force("x", d3.forceX())
          .force("y", d3.forceY());

        const link = selection
          .append("g")
          .selectAll("line")
          .data(links)
          .join("line")
          .attr("stroke", d =>
            d.source.id.startsWith("Cluster") ||
            d.target.id.startsWith("Cluster")
              ? "grey"
              : d.source.color === "green" && d.target.color === "green"
              ? "green"
              : d.source.color === "red" && d.target.color === "red"
              ? "red"
              : "orange"
          )
          .attr("stroke-opacity", 0.6)
          .attr("stroke-width", d => Math.sqrt(2));

        const node = selection
          .selectAll(".node")
          .data(nodes)
          .enter()
          .append("g")
          .attr("class", "node")
          .call(drag(simulation));

        node
          .append("image")
          .attr("xlink:href", d => {
            switch (d.image) {
              case "virus":
                return virus;
              case "female_recovered":
                return recoveredFemale;
              case "male_recovered":
                return recoveredMale;
              case "female_patient":
                return sickFemale;
              case "male_patient":
                return sickMale;
              default:
                return null;
            }
          })
          .attr("x", -8)
          .attr("y", -8)
          .attr("width", d => (d.id.startsWith("Case") ? 16 : 50))
          .attr("height", d => (d.id.startsWith("Case") ? 16 : 50));

        node
          .append("text")
          .attr("dx", 40)
          .attr("dy", "1em")
          .attr("fill", "black")
          .attr("font-family", "Roboto")
          .text(d => (d.label.startsWith("Case") ? "" : d.label));

        node.append("title").text(d => d.label);

        simulation.on("tick", () => {
          link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

          node.attr("transform", d => {
            return "translate(" + d.x + "," + d.y + ")";
          });
        });

        return selection.node();
      };

      d3.select(vizContainer.current)
        .append("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .call(chart)
        .call(svg =>
          d3.zoom().on("zoom", () => {
            svg.attr("transform", d3.event.transform);
          })
        );
    }
  });
  return (
    <svg
      className="viz-component"
      width={width}
      height={height}
      ref={vizContainer}
    />
  );
};
