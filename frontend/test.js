//@ts-check
const margin = { top: 20, bottom: 40, left: 30, right: 20 }
const width = 800 - margin.left - margin.right
const height = 600 - margin.top - margin.bottom

// Creates sources <svg> element
const svg = d3
    .select('body')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

// Group used to enforce margin
const g = svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

const data = [
    {
        name: 'Steve',
        age: 10,
        weight: 30,
        gender: 'male',
    },
    {
        name: 'Stan',
        age: 15,
        weight: 60,
        gender: 'male',
    },
    {
        name: 'Tom',
        age: 18,
        weight: 70,
        gender: 'male',
    },
    {
        name: 'Marie',
        age: 18,
        weight: 58,
        gender: 'female',
    },
]

const color = d3
    .scaleOrdinal()
    .domain(['female', 'male'])
    .range(['red', 'blue'])
const xscale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.age)])
    .range([0, width])
const yscale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.weight)])
    .range([height, 0])

const xaxis = d3.axisBottom(xscale)
const yaxis = d3.axisLeft(yscale)
g.append('g')
    .classed('x.axis', true)
    .attr('transform', `translate(0,${height})`)
    .call(xaxis)
g.append('g').classed('y.axis', true).call(yaxis)
const group = g.append('g')

const marks = group
    .selectAll('circle')
    .data(data)
    .join(
        (enter) => {
            const marks_enter = enter.append('circle')
            marks_enter.attr('r', 5).append('title')
            return marks_enter
        },
        (update) => update,
        (exit) => exit.remove()
    )

marks
    .style('fill', (d) => color(d.gender))
    .attr('cx', (d) => xscale(d.age))
    .attr('cy', (d) => yscale(d.weight))

marks.select('title').text((d) => d.name)
