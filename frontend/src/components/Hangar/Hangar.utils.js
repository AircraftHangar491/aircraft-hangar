import swal from 'sweetalert';
import _ from 'lodash';

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
export function hangarAlgorithm(planeCount, planes, hangars) {
  console.log(planes);
  console.log(hangars);

  const c17Count = planeCount['C-17'];
  const kc135Count = planeCount['KC-135'];
  const f22Count = planeCount['F-22'];

  // check if there is a plane
  if (c17Count === 0 && kc135Count === 0 && f22Count === 0) {
    swal('Error', 'There are no planes to be added to the hangar', 'error');
    return;
  }

  // returns [ [ key, object], ... ]
  const hangarArray = Object.entries(hangars);

  const firstHangar = hangarArray[0][1];

  // hangar corner
  const topLeftX = 0;
  const topLeftY = 0;

  const topRightX = firstHangar.width;
  const topRightY = 0;

  const bottomLeftX = 0;
  const bottomLeftY = firstHangar.height;

  const bottomRightX = firstHangar.width;
  const bottomRightY = firstHangar.height;


  let bigPlane = null;

  // check if there are big planes
    // if there are then put them in the center of the plane
  if (c17Count > 0 || kc135Count > 0) {
    // take the first big plane on the list
    bigPlane = _.find(planes.pending, ['type', 'C-17']) || _.find(planes.pending, ['type', 'KC-135']);

    // get the center of the hangar and place the plane there
    bigPlane.offsetX = firstHangar.width / 2;
    bigPlane.offsetY = firstHangar.height / 2;

    // add the plane to added planes list
    planes.added[bigPlane.id] = bigPlane;

    // add the plane to the hangar
    firstHangar.planes.push(bigPlane);

    // remove the plane from the pending list
    delete planes.pending[bigPlane.id];
    // decrease plane count
    planeCount[bigPlane.type] -= 1;
  }


  // returns [ [ key, object], ... ]
  const planeArray = Object.entries(planes.pending);

  // put a box length between the wall and the plane
  const box = 10;

  // used to guide the algorithm for each row
  let startY = 0;
  let startX = 0;

  // used to place the planes after the initial plane on a row
  let currentX = 0;
  let currentY = 0;

  // loop through the planes 
  for( const [id, plane] of planeArray)  {

    // if the plane is big then go to the next plane
    if (plane.type === 'C-17' || plane.type === 'KC-135') continue;

    const { width, height } = plane;

    console.log(id);
    console.log(plane)
    if (startY === 0 && startX === 0) {
      startY = firstHangar.height - ((height/2) + box);
      startX = (width/2) + box;

      currentY = startY;
      currentX = startX;
    }

    // check to see if there is a big plane
    if (bigPlane !== null) {
      // check if the corner would touch the big plane
        // if it will then go to the right
      const testPlane = {...plane};
      testPlane.offsetX = currentX;
      testPlane.offsetY = currentY;

      console.log(testPlane);
      console.log(collisionCheck(bigPlane, testPlane));
      console.log(collisionCheck(testPlane, bigPlane));
      while(collisionCheck(bigPlane, testPlane) || collisionCheck(testPlane, bigPlane)) {
        console.log('hello');
        currentX += (plane.width + box);

        if (currentX > firstHangar.width) {
          currentY -= (height + box);
          testPlane.offsetY  = currentY;

          currentX = startX;  
        };

        testPlane.offsetX = currentX;
      }
    }

    // set the position of the plane
    plane.offsetX = currentX;
    plane.offsetY = currentY;

    // add the plane to added planes list
    planes.added[id] = plane;

    // add the plane to the hangar
    firstHangar.planes.push(plane);

    // remove the plane from the pending list
    delete planes.pending[id];

    // decrease plane count
    planeCount[plane.type] -= 1;

    currentX += (width + box);

    // check if you reached the end of the row
    if (currentX > firstHangar.width) {
      currentX = startX;
      currentY -= (height + box);
    }

    // check if the top corner of the plane is outside the hangar
    if ((currentY - (height/2)) < 0) {
      break;
    } 
  }

  return { newPlaneCount: planeCount, newPlanes: planes, newHangars: hangars };
}

