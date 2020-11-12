import './App.css';
import React, { Component } from 'react'
import BubbleChart from './BubbleChart'
import * as d3 from 'd3';


class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const data_load = d3.json("./nations.json") // d3.json
    return (
      <div>
        <h2>React D3.js Bubble chart</h2>
        <BubbleChart data_load={data_load} />
      </div>
    )
  }
}

export default App;
