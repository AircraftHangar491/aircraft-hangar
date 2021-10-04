import { v4 as uuidv4 } from 'uuid';

export const getPlaneWidth = (type) => {
  if (type === "C-17") {
    return 517.5
  }

  if (type === "KC-135") {
    return 398.8
  }

  if (type === "F-22") {
    return 136
  }
}

export const getPlaneHeight = (type) => {
  if (type === "C-17") {
    return 530
  }

  if (type === "KC-135") {
    return 415.3
  }

  if (type === "F-22") {
    return 189
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
      width: getPlaneWidth(type),
      height: getPlaneHeight(type),
      style: {
        fill: '#6BA5D7',
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
    }
  );
}

export const updatePlaneInfo = (id, type) => {
  // get the array of plane objects
  const planeList = JSON.parse(window.localStorage.getItem('planes'));

  // find the index of the plane we want to change
  const index = planeList.findIndex(plane => plane.id === id);

  // get the plane so we can change it
  const plane = planeList[index];

  // update the appropriate fields
  const updatedPlane = {
    ...plane,
    type: type,
    width: getPlaneWidth(type),
    height: getPlaneHeight(type),
  }

  // update the list with the new plane
  planeList[index] = updatedPlane;

  // return the updated list
  return planeList;
}