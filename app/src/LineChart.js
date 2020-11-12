import React, { Component } from 'react'
import * as d3 from 'd3';


class LineChart extends Component {
    constructor(props) {
        super(props)
        this.createLineChart = this.createLineChart.bind(this)
    }

    componentDidMount() {
        this.createLineChart()
    }
    componentDidUpdate() {
        this.createLineChart()
    }

    createLineChart() {
        const _self = this;
        const node = this.node
        let width = 500,
            height = 500,
            margin = 50,
            x = d3.scaleLinear()
                .domain([0, 10])
                .range([margin, width - margin]),
            y = d3.scaleLinear()
                .domain([0, 10])
                .range([height - margin, margin]);

        let line = d3.line()
            .x(function (d) { return x(d.x); })
            .y(function (d) { return y(d.y); });

        let svg = d3.select(node);


        svg.attr("height", height)
            .attr("width", width);

        _self.props.data_load.then(function (data) {
            svg.selectAll("path")
                .data([data])
                .enter()
                .append("path")
                .attr("class", "line")
                .attr("d", function (d) { return line(d); });
            renderAxes(svg)
        });

        d3.select('#time_slider').attr("max", 1000).attr("value", 500);


        function renderAxes(svg) {
            var xAxis = d3.axisBottom()
                .scale(x.range([0, quadrantWidth()]))
                .scale(x);

            var yAxis = d3.axisLeft()
                .scale(y.range([quadrantHeight(), 0]))
                .scale(y);

            svg.append("g")
                .attr("class", "axis")
                .attr("transform", function () {
                    return "translate(" + xStart()
                        + "," + yStart() + ")";
                })
                .call(xAxis);

            svg.append("g")
                .attr("class", "axis")
                .attr("transform", function () {
                    return "translate(" + xStart()
                        + "," + yEnd() + ")";
                })
                .call(yAxis);
        }

        function xStart() { return margin; }
        function yStart() { return height - margin; }
        function xEnd() { return width - margin; }
        function yEnd() { return margin; }
        function quadrantWidth() { return width - 2 * margin; }
        function quadrantHeight() { return height - 2 * margin; }
    }

    render() {
        return <div>
        <div>
            <input id="time_slider" type="range" min="1" max="20" step="1" defaultvalue="10"/>
        </div>
        <div>
            <svg ref={node => this.node = node}/>
        </div>
        </div>
    }
}

export default LineChart
