import * as d3 from "d3";
import virus from "../images/virus.png";
import recoveredFemale from "../images/green_woman.png";
import recoveredMale from "../images/green_man.png";
import sickFemale from "../images/red_woman.png";
import sickMale from "../images/red_man.png";

export const createSimulation = ({ nodes, links }) => {
  return d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3.forceLink(links).id((d) => d.id)
    )
    .force("charge", d3.forceManyBody())
    .force("x", d3.forceX())
    .force("y", d3.forceY());
};

export const draw = (svg, simulation, { nodes, links }) => {
  const link = svg
    .append("g")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke", "grey")
    .attr("stroke-opacity", 1)
    .attr("stroke-width", 3);

  const node = svg
    .selectAll(".node")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .call(drag(simulation));

  node
    .append("image")
    .attr("xlink:href", (d) => getImage(d))
    .attr("x", -20)
    .attr("y", -20)
    .attr("width", (d) => (d.id.startsWith("Case") ? 50 : 100))
    .attr("height", (d) => (d.id.startsWith("Case") ? 50 : 100));

  node.append("title").text((d) => d.label);

  simulation.on("tick", () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("transform", (d) => {
      return "translate(" + d.x + "," + d.y + ")";
    });
  });

  return svg.node();
};

export const zoom = (node) =>
  d3.zoom().on("zoom", () => {
    node.attr("transform", d3.event.transform);
  });

const drag = (node) => {
  const dragstarted = (d) => {
    if (!d3.event.active) node.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  };

  const dragged = (d) => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  };

  const dragended = (d) => {
    if (!d3.event.active) node.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  };

  return d3
    .drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
};

const getImage = (node) => {
  if (node.caseNum === -1) {
    return virus;
  }

  if (node.isRecovered) {
    switch (node.gender) {
      case "F":
        return recoveredFemale;
      case "M":
        return recoveredMale;
      default:
        return null;
    }
  }

  switch (node.gender) {
    case "F":
      return sickFemale;
    case "M":
      return sickMale;
    default:
      return null;
  }
};
