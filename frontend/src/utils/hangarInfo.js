import { v4 as uuidv4 } from 'uuid';

export const hangarInfo = (name, length, width, count, dataManager) => {
  return (
    {
      id: uuidv4(),
      name: name,
      number: count.toString(),
      width: `${length*10}px`,
      height: `${width*10}px`,
      dataManager: dataManager,
      planes: [],
    }
  );
}
