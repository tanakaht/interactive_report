import "./LinkedText.css";
import React, { Component } from 'react'
import * as d3 from 'd3';
import { timeDay } from 'd3';

class LinkedText extends Component {
    constructor(props) {
        super(props);
        this.createLinkedText = this.createLinkedText.bind(this);
        this.divRef = React.createRef();
    }

    componentDidMount() {
        this.createLinkedText()
    }
    componentDidUpdate() {
        this.createLinkedText()
    }

    createLinkedText() {
        const _self = this;
        _self.props.reportData.then(function (reports) {
            let cnt=0
            for(let report of reports){
                cnt++
                if (cnt>1000){break}
                const rep = document.createElement('span');
                console.log(report)
                rep.append(document.createTextNode(report.text));
                rep.className = 'nonselected'
                rep.addEventListener("mouseenter", (event) => {   
                    if(report.focusArgs === null){
                        return;
                    }
                    _self.props.setFocus(...report.focusArgs);
                    rep.className = 'selected'
                  }, false);
                rep.addEventListener("mouseleave", (event) => {   
                    _self.props.setFocus();
                    rep.className = 'nonselected'
                    }, false);
                  _self.divRef.current.appendChild(rep);
                rep.append(document.createElement("br"));
            }
        });
    }

    render() {
        return <div ref={this.divRef} />
    }
}

export default LinkedText
