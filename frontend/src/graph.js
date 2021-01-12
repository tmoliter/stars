import * as d3 from "d3";
import axios from "axios";
//@ts-check
d3.select("#submit").on("click", () => {
  const start = d3.select("#start").property("value");
  const end = d3.select("#end").property("value");
  if (start && end) {
    axios
      .get(`http://bugenhagen.herokuapp.com/data?start=${start}&end=${end}`)
      .then((res) => {
        makeGraph(res.data);
      });
  }
});

const makeGraph = (data) => {
  const margin = { top: 20, bottom: 40, left: 30, right: 20 };
  const width = 1440 - margin.left - margin.right;
  const height = 900 - margin.top - margin.bottom;

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const topLevelG = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xscale = d3.scaleLinear().domain([0, 360]).range([0, width]);
  const yscale = d3.scaleLinear().domain([-65, 65]).range([height, 0]);

  const xaxis = d3.axisBottom(xscale);
  const yaxis = d3.axisLeft(yscale);

  topLevelG.append("g").attr("transform", `translate(0,${height})`).call(xaxis);
  topLevelG.append("g").call(yaxis);

  const group = topLevelG.append("g");

  const flatData = Object.values(data).flat();
  console.log(flatData)

  const circles = group
    .selectAll("circle")
    .data(flatData)
    .join(
      (enter) => enter.append("circle"),
      (update) => update,
      (exit) => exit.remove()
    );


  const dateToClassName = {}

  flatData.forEach((datum,i) => {
    if (!dateToClassName[datum.date]){
      dateToClassName[datum.date] = `date${i}`
    }
  })

  circles
    .attr("r", (planet) => planet.magnitude / 10)
    .attr("cx", xscale(180))
    .attr("cy", yscale(65))
    .style("fill", "white")
    .attr("class", (planet) => dateToClassName[planet.date])
    .attr("opacity",1)

  const totalDates = Object.keys(dateToClassName).length

  for (let i = 0; i < totalDates - 1; i++) {

    const transition = d3.selectAll(`.date${i}`).transition()
    const opacity = d3.select(`.date${i}`).attr("opacity")
    transition
      .delay(i * 2000)
      .duration(2000)
      .style("fill", (planet) => planet.color)
      .attr("cy", (planet) => yscale(planet.y))
      .attr("cx", (planet) => xscale(planet.x))
      .attr("opacity", opacity - ((totalDates - i + 1) *  (.5 / totalDates)));
  }
};
