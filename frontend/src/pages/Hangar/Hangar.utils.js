export function getCorners(plane) {

  const planeWidth = plane.width;
  const planeHeight = plane.height;

  const planeX = plane.offsetX;
  const planeY = plane.offsetY;

  // get the four corners
  const top = {
    x: planeX,
    y: (planeY - (planeHeight / 2))
  };

  const bottom = {
    x: planeX,
    y: (planeY + (planeHeight / 2))
  };

  const left = {
    x: (planeX - (planeWidth / 2)),
    y: planeY
  };

  const right = {
    x: (planeX + (planeWidth / 2)),
    y: planeY
  };

  return { top, bottom, left, right }
}

// check if the top or left corner of A is touching the bottom right edge of B
export function checkTopLeft(a, b) {

  // save the (x, y) coordinate of the bottom corner of the unchanged plane (b)
  let bottomX = b.bottom.x;
  let bottomY = b.bottom.y;

  // check each point of the bottom right edge of B 
  // going from bottom corner to right corner
  while (bottomX !== b.right.x && bottomY !== b.right.y) {

    // return false 
    // if the top corner is on the bottom left side of B or 
    // if the left corner is on the top right side of B
    if (a.top.x < b.bottom.x || a.left.y < b.right.y) {
      return false;
    }

    // return true
    // if the top corner of A is inside B or
    // if the left corner of A is inside B
    if (
      (a.top.x < bottomX && a.top.y < bottomY) ||
      (a.left.x < bottomX && a.left.y < bottomY)
    ) {
      return true;
    }

    // go to the next point along the edge
    bottomX += 1;
    bottomY -= 1;
  }

  return false;
}

export function checkTopRight(a, b) {

  let bottomX = b.bottom.x;
  let bottomY = b.bottom.y;

  while (bottomX !== b.left.x && bottomY !== b.left.y) {

    if ((a.top.x > b.bottom.x) || (a.right.y < b.left.y)) {
      return false;
    }

    if (
      (a.top.x > bottomX && a.top.y < bottomY) ||
      (a.right.x > bottomX && a.right.y < bottomY)
    ) {
      return true;
    }
    
    bottomX -= 1;
    bottomY -= 1;
  }
  return false;
}

export function checkBottomLeft(a, b) {
  
  let topX = b.top.x;
  let topY = b.top.y;

  while (topX !== b.right.x && topY !== b.right.y) {

    if ((a.left.y > b.right.y) || (a.bottom.x < b.top.x)) {
      return false;
    }

    if (
      (a.bottom.x < topX && a.bottom.y > topY) ||
      (a.left.x < topX && a.left.y > topY)
    ) {
      return true;
    }

    topX += 1;
    topY += 1;
  }

  return false;
}

export function checkBottomRight(a, b) {
  let topX = b.top.x;
  let topY = b.top.y;

  while (topX !== b.left.x && topY !== b.left.y) {

    if ((a.right.y > b.right.y) || (a.bottom.x > b.top.x)) {
      return false;
    }

    if (
      (a.bottom.x > topX && a.bottom.y > topY) ||
      (a.right.x > topX && a.right.y > topY)
    ) {
      return true;
    }

    topX -= 1;
    topY += 1;
  }

  return false;
}

/*
  Two types of placement
  1) Fit the biggest plane, either C-17 or KC-135, in the center then fit F-22's around the big plane.
  2) Do not fit a big plane and only fit F-22's.
*/
export function hangarAlgorithm(planes, hangar) {
  console.log(planes);

  // copy planes
  const planeList = [...planes];

  // find the mid point of the hangar
  const midX = hangar.width / 2;
  const midY = hangar.height / 2;

  const bigPlane = planeList.find(plane => plane.type === "C-17");
  
  bigPlane.offsetX = midX;
  bigPlane.offsetY = midY;

  const index = planeList.findIndex(plane => plane.id === bigPlane.id);
  planeList[index] = bigPlane;

  return { planeList, updated: planeList[index] };
}

