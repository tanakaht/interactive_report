import React, { Component } from 'react'
import * as d3 from 'd3';
/*
class LinkedText extends Component {
    constructor(props) {
        super(props);
        this.createBubbleChart = this.createBubbleChart.bind(this);
        this.emphasisObjects = new Set();
        this.timeRange = [1800, 2009];
        this.emphasisObjects.add("United States");
    }

    componentDidMount() {
        this.createBubbleChart()
    }
    componentDidUpdate() {
        this.createBubbleChart()
    }

    createBubbleChart() {
        const _self = this;
        const node = this.node
        let width = 1000,
            height = 500,
            margin = ({top: 20, right: 20, bottom: 35, left: 40}),
            interval = 100; 
        var x = d3.scaleLog([200, 1e5], [margin.left, width - margin.right]), 
            y = d3.scaleLinear([14, 86], [height - margin.bottom, margin.top]),
            radius = d3.scaleSqrt([0, 5e8], [0, width / 24]),
            color = d => _self.emphasisObjects.has(d)?"red":"black";

        let svg = d3.select(node);
        let timeSlider = d3.select('#timeSlider');

        svg.attr("height", height)
            .attr("width", width);

        _self.props.data_load.then(function (dataset) {
            // 図の初期化
            timeSlider.attr('min', _self.timeRange[0]).attr('max', _self.timeRange[1]).attr('value', _self.timeRange[0])
            svg.append("g").attr("stroke", "black")
                           .selectAll("circle")
                           .data(dataAt(dataset, _self.timeRange[0]), d => d.name)
                           .join("circle")
                           .sort((a, b) => d3.descending(a.population, b.population))
                           .attr("cx", d => x(d.income))
                           .attr("cy", d => y(d.lifeExpectancy))
                           .attr("r", d => radius(d.population))
                           .attr("fill", d => color(d.name))
                           .call(circle => circle.append("title")
                           .text(d => [d.name, d.region].join("\n")));

            timeSlider.on("change", function() {
                var currentTime = this.value;
                update(dataset, currentTime)
            });
            function step(){
                var currentTime = Number(timeSlider.attr('value'));
                if (currentTime >= _self.timeRange[1] || currentTime < _self.timeRange[0]){
                    timeSlider.attr("value", _self.timeRange[0]);
                    update(dataset, _self.timeRange[0]);
                } else{
                    timeSlider.attr("value", currentTime+1);
                    update(dataset, currentTime+1)
                }
            }
            setInterval(step, interval)
            renderAxes(svg)
        });


        function update(dataset, year){
            const circles = svg.selectAll('circle')
            circles.data(dataAt(dataset, year), d => d.name)
                    .sort((a, b) => d3.descending(a.population, b.population))
                    .transition().duration(interval)
                    .attr("cx", d => x(d.income))
                    .attr("cy", d => y(d.lifeExpectancy))
                    .attr("r", d => radius(d.population))
                    .attr("fill", d => color(d.name))
        }

        function dataAt(dataset, year) {
            return dataset.map(d => ({
              name: d.name,
              region: d.region,
              income: valueAt(d.income, year),
              population: valueAt(d.population, year),
              lifeExpectancy: valueAt(d.lifeExpectancy, year)
            }))
        }

        function valueAt(values, year) {
            const i = d3.bisector(([year]) => year).left(values, year, 0, values.length - 1);
            const a = values[i];
            if (year>a[0] || i===0){
                return  a[1];
                  
            } else {
              const b = values[i - 1];
              const t = (year - a[0]) / (b[0] - a[0]);
              return a[1] * (1 - t) + b[1] * t;
            }
          }

        function renderAxes(svg) {
            var xAxis = g => g.attr("transform", `translate(0,${height - margin.bottom})`)
                              .call(d3.axisBottom(x).ticks(width / 80, ","))
                              .call(g => g.select(".domain").remove())
                              .call(g => g.append("text")
                                  .attr("x", width)
                                  .attr("y", margin.bottom - 4)
                                  .attr("fill", "currentColor")
                                  .attr("text-anchor", "end")
                                  .text("Income per capita (dollars) →"));

            var yAxis = g => g.attr("transform", `translate(${margin.left},0)`)
                              .call(d3.axisLeft(y))
                              .call(g => g.select(".domain").remove())
                              .call(g => g.append("text")
                                  .attr("x", -margin.left)
                                  .attr("y", 10)
                                  .attr("fill", "currentColor")
                                  .attr("text-anchor", "start")
                                  .text("↑ Life expectancy (years)"))

            svg.append("g")
                .attr("class", "axis")
                .call(xAxis);

            svg.append("g")
                .attr("class", "axis")
                .call(yAxis);
        }

    }

    render() {
        return <div>
        <div>
            <input id="timeSlider" type="range" min="1" max="20" step="1" defaultvalue="10"/>
        </div>
        <div>
            <svg ref={node => this.node = node}/>
        </div>
        </div>
    }
}

export default BubbleChart
*/