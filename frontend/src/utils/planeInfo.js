import { v4 as uuidv4 } from 'uuid';

export const size = (type) => {
  if (type === "C-17") {
    return { width: 517.5, height: 530 }
  }

  if (type === "KC-135") {
    return { width: 398.8, height: 415.3 }
  }

  if (type === "F-22") {
    return { width: 136, height: 189 }
  }
}

export const color = (type) => {
  if (type === "C-17") {
    return "#6BA5D7"
  }

  if (type === "KC-135") {
    return  "#389876"
  }

  if (type === "F-22") {
    return "#D04061"
  }
}

export const planeInfo = (name, type) => {

  return (
    {
      id: uuidv4(),
      name: name,
      type: type,
      isOpen: false,
      // set the node's position to be based on the center
      pivot: {
        x: 0.5,
        y: 0.5,
      },
      // Position of the node
      offsetX: Math.floor(Math.random() * 101),
      offsetY: Math.floor(Math.random() * 101),
      // Size of the node
      width: size(type).width,
      height: size(type).height,
      style: {
        fill: color(type),
        strokeColor: 'white'
      },
      //Sets type as Bpmn and shape as Event
      shape: {
        type: 'Bpmn',
        shape: 'Gateway',
        // set the event type as End
        event: {
          event: 'End'
        }
      },
      annotations: [{
        content: name
      }],
    }
  );
}

export const updatePlaneInfo = (id, type, name) => {
  // get the array of plane objects
  const planeList = JSON.parse(window.localStorage.getItem('planes'));

  // get the plane so we can change it
  const plane = planeList[id];

  // update the appropriate fields
  const updatedPlane = {
    ...plane,
    name: name,
    type: type,
    width: size(type).width,
    height: size(type).height,
    style: {
      ...plane.style,
      fill: color(type)
    },
    annotations: [{
      content: name
    }]
  }

  // update the list with the new plane
  planeList[id] = updatedPlane;

  // return the updated list
  return planeList;
}