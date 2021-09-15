import React, { Component } from "react";
import "./Hangar.css";
import GridLayout from "react-grid-layout";

class Hangar extends Component {

  render() {

    const layout = [ 
      {i: 'a', x: 0, y: 0, w: 1, h: 2, bool: true},
      {i: 'b', x: 0, y: 0, w: 4, h: 2},
      {i: 'c', x: 0, y: 0, w: 1, h: 2, bool: true},
    ];

    return (
      <div>
        <main className="container">
          <GridLayout
              className="layout"
              layouts={layout}
              cols={12}
              rowHeight={30}
              width={1200}
              compactType="null"
              isBounded={true}
            >
              {layout.map((item) => <div key={item.i} data-grid={{x: item.x, y: item.y, w: item.w, h: item.h, static: item.bool}}>{item.i}</div>)}   

            </GridLayout>
        </main>
      </div>
    );  
  }
}

export default Hangar;