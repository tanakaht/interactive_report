import React, { Component } from 'react'
import LinkedText from './LinkedText'
import * as d3 from 'd3';

class BubbleChart extends Component {
    // TODO: 軸ごとにデータを受け取る
    constructor(props) {
        super(props);
        this.createBubbleChart = this.createBubbleChart.bind(this);
        this.defaulttimeRange = [1800, 2009];
        this.state = {year: this.defaulttimeRange[0], emphasisObjects: new Set(), emphasisTimeRange: [this.defaulttimeRange[0], this.defaulttimeRange[1]]}
        this.setFocus = this.setFocus.bind(this);
    }

    setFocus(timeRange, emphasisObjects){
        if(timeRange === null || timeRange === undefined){
            timeRange = this.defaulttimeRange;
        }
        this.setState({
            emphasisTimeRange: timeRange,
            emphasisObjects: new Set(emphasisObjects)
          });
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
            interval = 200; 
        var x = d3.scaleLog([200, 1e5], [margin.left, width - margin.right]), 
            y = d3.scaleLinear([14, 86], [height - margin.bottom, margin.top]),
            radius = d3.scaleSqrt([0, 5e8], [0, width / 24]),
            color = d => _self.state.emphasisObjects.has(d)?"red":"black";

        let svg = d3.select(node);
        let timeSlider = d3.select('#timeSlider');

        svg.attr("height", height)
            .attr("width", width);

        _self.props.data_load.then(function (dataset) {
            // 図の初期化
            _self.dataset = dataset;
            svg.append("g").attr("stroke", "black")
                           .selectAll("circle")
                           .data(dataAt(_self.state.emphasisTimeRange[0]), d => d.name)
                           .join("circle")
                           .sort((a, b) => d3.descending(a.population, b.population))
                           .attr("cx", d => x(d.income))
                           .attr("cy", d => y(d.lifeExpectancy))
                           .attr("r", d => radius(d.population))
                           .attr("fill", d => color(d.name))
                           .call(circle => circle.append("title")
                           .text(d => [d.name, d.region].join("\n")));

            renderAxes(svg)
        });


        function step(){
            const currentTime = Number(_self.state.year);
            if (currentTime >= _self.state.emphasisTimeRange[1] || currentTime < _self.state.emphasisTimeRange[0]){
                //_self.setState({year: _self.state.emphasisTimeRange[0]});
            } else{
                _self.setState({year: currentTime+1});
            }
        }
        setInterval(step, interval)

        function update_year(){
            const circles = svg.selectAll('circle'), year = _self.state.year
            circles.data(dataAt(year), d => d.name)
                    .sort((a, b) => d3.descending(a.population, b.population))
                    .transition().duration(interval)
                    .attr("cx", d => x(d.income))
                    .attr("cy", d => y(d.lifeExpectancy))
                    .attr("r", d => radius(d.population))
                    .attr("fill", d => color(d.name))
            _self.state.setState({year: year})
        }
        _self.update_year = update_year.bind(_self)

        function dataAt(year) {
            return _self.dataset.map(d => ({
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
    //timeSlider.attr('min', _self.state.emphasisTimeRange[0]).attr('max', _self.state.emphasisTimeRange[1]).attr('value', _self.state.emphasisTimeRange[0])

    render() {
        console.log(this.props.reportData)
        return <div>
        <div>
            <input id="timeSlider" type="range" value={this.state.year} onChange={this.update_year} min={this.defaulttimeRange[0]} max={this.defaulttimeRange[1]}/>
        </div>
        <div>
            <svg ref={node => this.node = node}/>
            <LinkedText reportData={this.props.reportData} setFocus={this.setFocus}/>
        </div>
        </div>
    }
}

export default BubbleChart
