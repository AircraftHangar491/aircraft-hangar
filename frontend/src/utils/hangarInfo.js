import { v4 as uuidv4 } from 'uuid';

export const hangarInfo = (name, length, width) => {
  return (
    {
      id: uuidv4(),
      name: name,
      width: `${length*10}px`,
      height: `${width*10}px`,
      planes: [],
    }
  );
}
