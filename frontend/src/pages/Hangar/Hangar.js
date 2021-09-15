import React, { Component } from "react";
import "./Hangar.css";
import RGL, { WidthProvider } from "react-grid-layout";
import { Button, Form } from 'reactstrap';
import { bottom } from "../../utils";

const ResponsiveGridLayout = WidthProvider(RGL);

class Hangar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      layoutHeight: 0,
      rowHeight: 150,
      layout: [
        {i: 'a', x: 0, y: 0, w: 1, h: 1, static: true},
        {i: 'b', x: 1, y: 1, w: 1, h: 1, static: false},
        {i: 'c', x: 4, y: 1, w: 1, h: 1, static: true}
      ],
    }

    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.getContainerHeight = this.getContainerHeight.bind(this);
  }

  getContainerHeight() {

    const newHeight = bottom(this.state.layout) * (this.state.rowHeight + 20);

    if (newHeight > this.state.layoutHeight) {
      this.setState({ layoutHeight: newHeight });
    }

    return `${this.state.layoutHeight}px`;
  }

  onLayoutChange(layout) {
    console.log(layout);
    this.setState({ layout });
  }

  render() {

    console.log(this.getContainerHeight());
    return (
      <div className="container hangar">
        <div className="row">
          <div className="col-sm">
            <h1>space for form</h1>
          </div>
          <div className="col-sm layout">
            <ResponsiveGridLayout
              style={{ height: this.getContainerHeight() }}
              cols={5}
              rowHeight={this.state.rowHeight}
              layouts={this.state.layout}
              onLayoutChange={this.onLayoutChange}
              compactType={null}
              preventCollision={true}
              isBounded={true}
              isResizable={false}
            >
              {this.state.layout.map((item) => <div
                                                key={item.i}
                                                data-grid={{x: item.x, y: item.y, w: item.w, h: item.h, static: item.static}}
                                               >
                                                 {item.i}
                                               </div>)}    
            </ResponsiveGridLayout>
          </div>
        </div>
      </div>
    );  
  }
}

export default Hangar;