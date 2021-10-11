function getCorners(plane) {

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

function calculateArea(px, py, trianglePoints) {
  const { x1, y1, x2, y2, x3, y3 } = trianglePoints;

  const area1 = Math.abs( (x1-px)*(y2-py) - (x2-px)*(y1-py) );
  const area2 = Math.abs( (x2-px)*(y3-py) - (x3-px)*(y2-py) );
  const area3 = Math.abs( (x3-px)*(y1-py) - (x1-px)*(y3-py) );

  return (area1 + area2 + area3);
}

function checkTopHalf(a, b) {
  const x1 = b.left.x;
  const y1 = b.left.y;
  const x2 = b.right.x;
  const y2 = b.right.y;
  const x3 = b.top.x;
  const y3 = b.top.y;

  const AreaOfB = Math.abs( (x2-x1)*(y3-y1) - (x3-x1)*(y2-y1) );

  const leftX = a.left.x;
  const leftY = a.left.y;

  const topX = a.top.x;
  const topY = a.top.y;

  const rightX = a.right.x;
  const rightY = a.right.y;

  const bottomX = a.bottom.x;
  const bottomY = a.bottom.y;

  const bPoints = { x1, y1, x2, y2, x3, y3 };
  if (
    (calculateArea(leftX, leftY, bPoints) === AreaOfB) ||
    (calculateArea(topX, topY, bPoints) === AreaOfB) ||
    (calculateArea(rightX, rightY, bPoints) === AreaOfB) ||
    (calculateArea(bottomX, bottomY, bPoints) === AreaOfB)
  ) {
    return true;
  }

  return false;
}

function checkBottomHalf(a, b) {

  const x1 = b.left.x;
  const y1 = b.left.y;
  const x2 = b.right.x;
  const y2 = b.right.y;
  const x3 = b.bottom.x;
  const y3 = b.bottom.y;

  const AreaOfB = Math.abs( (x2-x1)*(y3-y1) - (x3-x1)*(y2-y1) );

  const leftX = a.left.x;
  const leftY = a.left.y;

  const topX = a.top.x;
  const topY = a.top.y;

  const rightX = a.right.x;
  const rightY = a.right.y;

  const bottomX = a.bottom.x;
  const bottomY = a.bottom.y;

  const bPoints = { x1, y1, x2, y2, x3, y3 };
  if (
    (calculateArea(leftX, leftY, bPoints) === AreaOfB) ||
    (calculateArea(topX, topY, bPoints) === AreaOfB) ||
    (calculateArea(rightX, rightY, bPoints) === AreaOfB) ||
    (calculateArea(bottomX, bottomY, bPoints) === AreaOfB)
  ) {
    return true;
  }

  return false;
}

export function collisionCheck(a, b) {
  const planeA = getCorners(a);
  const planeB = getCorners(b);

  if (checkTopHalf(planeA, planeB) || checkBottomHalf(planeA, planeB)) return true;

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
  
  if (bigPlane) {
    bigPlane.offsetX = midX;
    bigPlane.offsetY = midY;

    const index = planeList.findIndex(plane => plane.id === bigPlane.id);
    planeList[index] = bigPlane;
  }

  return planeList;
}

