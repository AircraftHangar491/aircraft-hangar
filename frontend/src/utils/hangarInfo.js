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
