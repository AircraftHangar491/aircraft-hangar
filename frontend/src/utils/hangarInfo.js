import { v4 as uuidv4 } from 'uuid';

export const hangarInfo = (name, length, width, count, dataManager) => {
  return (
    {
      id: uuidv4(),
      name: name,
      number: count.toString(),
      width: width*10,
      height: length*10,
      dataManager: dataManager,
      planes: [],
    }
  );
}

export const updateHangarInfo = (id, name, width, height) => {

  const hangarList = JSON.parse(window.localStorage.getItem('hangars'));

  const hangar = hangarList[id];

  const updatedHangar = {
    ...hangar,
    name: name || hangar.name,
    width: width*10,
    height: height*10,
  }

  hangarList[id] = updatedHangar;

  return hangarList;
}

export const obstructionInfo = (hangarWidth, hangarHeight) => {

  const centerX = hangarWidth / 2;
  const centerY = hangarHeight / 2;

  const maxX = centerX + (hangarWidth/4);
  const minX = centerX - (hangarWidth/4);

  const maxY = centerY + (hangarHeight/4);
  const minY = centerY - (hangarHeight/4);

  const offsetX = Math.floor(Math.random() * (maxX - minX) + minX);
  const offsetY = Math.floor(Math.random() * (maxY - minY) + minY);

  return ({
    id: uuidv4(),
    name: "obstruction",
    width: 100,
    height: 100,
    style: {
      fill: 'black',
      strokeColor: 'white'
    },
    pivot: {
      x: 0.5,
      y: 0.5,
    },
    offsetX: offsetX,
    offsetY: offsetY,
  })
}