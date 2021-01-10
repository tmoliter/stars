import * as d3 from "d3";
import axios from "axios";
import { schemeDark2 } from "d3";
//@ts-check
d3.select("#submit").on("click", () => {
  const start = d3.select("#start").property("value");
  const end = d3.select("#end").property("value");
  if (start && end) {
    axios
      .get(`http://bugenhagen.herokuapp.com/?start=${start}&end=${end}`)
      .then((res) => {
        // d3.select("#graph").text(JSON.stringify(res.data))
        makeGraph(res.data);
      });
  }
});

const makeGraph = (data) => {
  const margin = { top: 20, bottom: 40, left: 30, right: 20 };
  const width = 800 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  // Creates sources <svg> element
  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  // Group used to enforce margin
  const topLevelG = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xscale = d3.scaleLinear().domain([0, 360]).range([0, width]);
  const yscale = d3.scaleLinear().domain([-65, 65]).range([height, 0]);

  // BEGIN AXIS LABEL CODE
  const xaxis = d3.axisBottom(xscale);
  const yaxis = d3.axisLeft(yscale);

  console.log("1");
  topLevelG
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(xaxis);
  topLevelG.append("g").call(yaxis);
  // END AXIS LABEL CODE

  const group = topLevelG.append("g");

  const flatData = Object.values(data).flat();

  const marks = group
    .selectAll("circle")
    .data(flatData)
    .join(
      (enter) => {
        const marks_enter = enter.append("circle").attr("r", 10);
        marks_enter.append("title");
        return marks_enter;
      },
      (update) => update,
      (exit) => exit.remove()
    );

  marks
    .style("fill", (planet) => planet.color)
    .attr("cx", (planet) => xscale(planet.x))
    .attr("cy", (planet) => yscale(planet.y));

  marks.select("title").text((d) => d.name);
};
