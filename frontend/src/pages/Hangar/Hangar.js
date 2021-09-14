import React, { Component } from "react";
import "./Hangar.css";
import GridLayout from "react-grid-layout";

class Hangar extends Component {

  render() {

    const layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2},
      {i: 'b', x: 1, y: 0, w: 3, h: 2},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
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
            >
              {layout.map((item) => <div key={item.i}>{item.i}</div>)}    
            </GridLayout>
        </main>
      </div>
    );  
  }
}

export default Hangar;