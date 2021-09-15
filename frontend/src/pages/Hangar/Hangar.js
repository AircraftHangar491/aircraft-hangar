import React, { Component } from "react";
import "./Hangar.css";
import GridLayout from "react-grid-layout";

class Hangar extends Component {

  render() {

    const layout = [ 
      {i: 'a', x: 0, y: 0, w: 2, h: 2, bool: true},
      {i: 'b', x: 0, y: 0, w: 10, h: 10},
      {i: 'c', x: 0, y: 0, w: 1, h: 1, bool: true},
    ];

    return (
      <div>
        <main className="container">
          <GridLayout
              className="layout"
              layouts={layout}
              cols={40}
              rowHeight={17.5}
              width={1110}
              compactType="null"
              isBounded={true} 
              isResizable={false}
              
              
            >
              {layout.map((item) => <div key={item.i} data-grid={{x: item.x, y: item.y, w: item.w, h: item.h, static: item.bool}}>{item.i}</div>)}   

            </GridLayout>
        </main>
      </div>
    );  
  }
}

export default Hangar;