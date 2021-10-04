import { v4 as uuidv4 } from 'uuid';

export const f22 = (name) => {
  return (
    {
      id: uuidv4(),
      name: name,
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
      width: 136, 
      height: 189,
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

export const c17 = (name) => {
  return (
    {
      id: uuidv4(),
      name: name,
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
      width: 517.5,
      height: 530,
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

export const kc135 = (name) => {
  return (
    {
      id: uuidv4(),
      name: name,
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
      width: 398.8,
      height: 415.3,
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