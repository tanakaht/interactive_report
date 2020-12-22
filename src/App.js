import './App.css';
import React, { Component } from 'react'
import BubbleChart from './BubbleChart'
import LinkedText from './LinkedText'
// import Axios from 'axios';
import * as d3 from 'd3';


class App extends Component {
  constructor(props) {
    super(props)
    this.BubbleChartRef = React.createRef();
    this.LinkedTextRef = React.createRef();
    this.setFocus = this.setFocus.bind(this);
    this.setDatafact = this.setDatafact.bind(this);
  }

  setFocus(timeRange, emphasisObjects){
    this.BubbleChartRef.current.setFocus(timeRange, emphasisObjects);
  }

  setDatafact(datafact){
    datafact['attrs'] = 'time'
    console.log(datafact)
    const reportData = fetch("//localhost:5000/find", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datafact)
    });
    this.LinkedTextRef.current.update_text(reportData)

  }

  render() {
    const data_load = d3.json("./nations.json"),
    // reportData = fetch("//localhost:5000/", {method: "GET"});
    reportData = fetch("//localhost:5000/find", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'text': "Afghanistan's income has pos_grad (1979 ~ 1984)\n", 'focusArgs': [[1979, 1984], ['Afghanistan']], 'country': 'Afghanistan', 'ind': 'income', 'from_': 1979, 'to_': 1984, 'ptype': 'pos_grad', "attrs": 'time ind ptype'})
    });

    const doc = (
      <div>
        <h2>React D3.js Bubble chart</h2>
        <BubbleChart data_load={data_load} ref={this.BubbleChartRef}/>
        <LinkedText init_data={reportData} setFocus={this.setFocus} setDatafact={this.setDatafact} ref={this.LinkedTextRef}/>
      </div>
    )
    return doc
  }
}

export default App;
