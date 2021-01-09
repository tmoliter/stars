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
        makeGraph(res.data)
      });
  }
});

const makeGraph = (data) => {
  const margin = { top: 20, bottom: 40, left: 30, right: 20 };
  const width = 800 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;
  console.log(data)

  // Creates sources <svg> element
  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  // Group used to enforce margin
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const oldShit = [
    {
      name: "Steve",
      age: 10,
      weight: 30,
      gender: "male",
    },
    {
      name: "Stan",
      age: 15,
      weight: 60,
      gender: "male",
    },
    {
      name: "Tom",
      age: 18,
      weight: 70,
      gender: "male",
    },
    {
      name: "Marie",
      age: 18,
      weight: 58,
      gender: "female",
    },
  ];

  // const color = d3
  //   .scaleOrdinal()
  //   .domain(["female", "male"])
  //   .range(["red", "blue"]);
  const xscale = d3
    .scaleLinear()
    .domain([0, 360])
    .range([0, width]);
  const yscale = d3
    .scaleLinear()
    .domain([-65, 65])
    .range([height, 0]);

  const xaxis = d3.axisBottom(xscale);
  const yaxis = d3.axisLeft(yscale);

  // console.log("1")
  // g.append("g")
  //   .classed("x.axis", true)
  //   .attr("transform", `translate(0,${height})`)
  //   .call(xaxis);
  // g.append("g").classed("y.axis", true).call(yaxis);
  const group = g.append("g");

  console.log("2")

  const flatData = Object.values(data).flat()
  console.log(flatData)

  const marks = group
    .selectAll("circle")
    .data(flatData)
    .join(
      (enter) => {
        const marks_enter = enter.append("circle");
        marks_enter.attr("r", 10).append("title");
        return marks_enter;
      },
      (update) => update,
      (exit) => exit.remove()
    );

  console.log("3")
  marks
    .style("fill", (planet) => planet.color)
    .attr("cx", (planet) => planet.x)
    .attr("cy", (planet) => planet.y);

  console.log(marks)
  marks.select("title").text((d) => d.name);


};
