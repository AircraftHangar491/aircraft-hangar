import swal from 'sweetalert';
import _ from 'lodash';

// get the plane corners
function getCorners(plane) {

  let top;
  let bottom;
  let left;
  let right;

  const planeWidth = plane.width;
  const planeHeight = plane.height;

  const planeX = plane.offsetX;
  const planeY = plane.offsetY;

  if (plane.name !== "obstruction") {

    // get the plane corners
    top = {
      x: planeX,
      y: (planeY - (planeHeight / 2))
    };
  
    bottom = {
      x: planeX,
      y: (planeY + (planeHeight / 2))
    };
  
    left = {
      x: (planeX - (planeWidth / 2)),
      y: planeY
    };
  
    right = {
      x: (planeX + (planeWidth / 2)),
      y: planeY
    };
    console.log(plane);
    console.log({ top, bottom, left, right });
  } else {
    // get obstruction corners
    // imagine as if a square was rotated clockwise to look like a diamond

    // top left
    top = {
      x: planeX - (planeWidth / 2),
      y: planeY - (planeHeight / 2)
    };

    // bottom right
    bottom = {
      x: planeX + (planeWidth / 2),
      y: planeY + (planeHeight / 2)
    }

    // bottom left
    left = {
      x: planeX - (planeWidth / 2),
      y: planeY + (planeHeight / 2)
    }

    // top right
    right = {
      x: planeX + (planeWidth / 2),
      y: planeY - (planeHeight / 2)
    }
  }

  return { top, bottom, left, right }
}

function calculateArea(px, py, trianglePoints) {
  const { x1, y1, x2, y2, x3, y3 } = trianglePoints;

  const area1 = Math.abs( (x1-px)*(y2-py) - (x2-px)*(y1-py) );
  const area2 = Math.abs( (x2-px)*(y3-py) - (x3-px)*(y2-py) );
  const area3 = Math.abs( (x3-px)*(y1-py) - (x1-px)*(y3-py) );

  return (area1 + area2 + area3);
}

// check if any corner of a is touching the top half of b
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
    (calculateArea(topX, topY, bPoints) === AreaOfB) ||
    (calculateArea(bottomX, bottomY, bPoints) === AreaOfB)
  ) {
    return true;
  }

  return false;
}

// check if any corner of a is touching the bottom half of b
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
    (calculateArea(topX, topY, bPoints) === AreaOfB) ||
    (calculateArea(bottomX, bottomY, bPoints) === AreaOfB)
  ) {
    return true;
  }

  return false;
}

function checkLeftHalf(a, b) {
  const x1 = b.left.x;
  const y1 = b.left.y;

  const x2 = b.top.x;
  const y2 = b.top.y;

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
    (calculateArea(topX, topY, bPoints) === AreaOfB) ||
    (calculateArea(bottomX, bottomY, bPoints) === AreaOfB)
  ) {
    return true;
  }

  return false;
}

function checkRightHalf(a, b) {
  const x1 = b.top.x;
  const y1 = b.top.y;

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
    (calculateArea(topX, topY, bPoints) === AreaOfB) ||
    (calculateArea(bottomX, bottomY, bPoints) === AreaOfB)
  ) {
    return true;
  }

  return false;
}

export function collisionCheck(a, b) {
  let collision = false;

  const planeB = getCorners(b);

  for(let obstruction of a) {
    if (obstruction === null) continue;

    const planeA = getCorners(obstruction);

    if (
      checkTopHalf(planeA, planeB) || checkBottomHalf(planeA, planeB) || checkTopHalf(planeB, planeA) || checkBottomHalf(planeB, planeA) ||
      checkLeftHalf(planeA, planeB) || checkRightHalf(planeA, planeB) || checkLeftHalf(planeB, planeA) || checkRightHalf(planeB, planeA)
    ) {
      console.log({planeA, obstruction, planeB, b});
      collision = true;
      break;
    }  
  }

  console.log(collision);
  return collision;
}

export function testCollisionCheck(a, b) {
  const planeA = getCorners(a);
  const planeB = getCorners(b);
  if (checkTopHalf(planeA, planeB) || checkBottomHalf(planeA, planeB)) {      console.log({planeA, a, planeB, b});
  return true};
  return false;
}

/*
  Two types of placement
  1) Fit the biggest plane, either C-17 or KC-135, in the center then fit F-22's around the big plane.
  2) Do not fit a big plane and only fit F-22's.
*/
export function hangarAlgorithm(planeCount, planes, hangars) {

  // check if there is a plane
  if (planeCount['C-17'] === 0 && planeCount['KC-135'] === 0 && planeCount['F-22'] === 0) {
    swal('Error', 'There are no planes to be added to the hangar', 'error');
    return;
  }

  // returns [ [ key, object], ... ]
  const hangarArray = Object.entries(hangars);

  for (const [id, hangar] of hangarArray) {

    // if there are no planes left then leave
    if (planeCount['C-17'] === 0 && planeCount['KC-135'] === 0 && planeCount['F-22'] === 0) break;

    const obstructionList = [];
    hangar.planes.forEach(node => obstructionList.push(node));

    let bigPlane = null;

    // check if there are big planes
      // if there are then put them in the center of the plane
    if (planeCount['C-17'] > 0 || planeCount['KC-135'] > 0) {

      let checkBigPlane = _.find(obstructionList, obstruction => obstruction.type === 'C-17' || obstruction.type === 'KC-135');

      if (checkBigPlane) {
        // if there is already a big plane in the hangar then dont put a big plane
        bigPlane = checkBigPlane;

      } else {
        
        // take the first big plane on the list
        for(let id of Object.keys(planes.pending)) {

          const plane = planes.pending[id];

          // get the first big plane that fits into the hangar
          if ((plane.type === "C-17" || plane.type === "KC-135") && plane.width < hangar.width && plane.height < hangar.width) {
            bigPlane = plane;

            // get the center of the hangar and place the plane there
            bigPlane.offsetX = hangar.width / 2;
            bigPlane.offsetY = hangar.height / 2;
        
            // add the plane to added planes list
            planes.added[bigPlane.id] = bigPlane;
        
            // add the plane to the hangar
            hangar.planes.push(bigPlane);

            // add the plane to the obstruction list
            obstructionList.push(bigPlane);
            console.log(obstructionList);

            // remove the plane from the pending list
            delete planes.pending[id];

            // decrease plane count
            planeCount[bigPlane.type] -= 1;
            break;
          }
        }
      }
    }
    
    console.log(obstructionList);
    console.log(bigPlane);

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
  
    // keep track of row number
    let row = 1;

    // loop through the planes 
    for( const [id, plane] of planeArray)  {
  
      // if the plane is big then go to the next plane
      if (plane.type === 'C-17' || plane.type === 'KC-135') continue;
  
      const { width, height } = plane;
  
      if (startY === 0 && startX === 0) {
        startY = hangar.height - ((height/2) + box);
        startX = (width/2) + box;
  
        currentY = startY;
        currentX = startX;
      }
  
      // check to see if there are anything inside the hangar
      if (obstructionList.length > 0) {

        const testPlane = {...plane};

        testPlane.offsetX = currentX;
        testPlane.offsetY = currentY;

        let testCurrentX = currentX;
        let testCurrentY = currentY;

        // eslint-disable-next-line no-loop-func
        while(collisionCheck(obstructionList, testPlane)) {

          testCurrentX += ((width/2) + box);
  
          if ((testCurrentX + (width/2)) > hangar.width) {
            testCurrentY -= (height + box);
            testPlane.offsetY  = testCurrentY;
  
            testCurrentX = startX;  
          };
  
          testPlane.offsetX = testCurrentX;

          console.log("------------TEST PLANE-------------------")
          console.log(testPlane);
        }

        currentX = testCurrentX;
        currentY = testCurrentY;
      }
  
      // set the position of the plane
      plane.offsetX = currentX;
      plane.offsetY = currentY;
  
      // add the plane to added planes list
      planes.added[id] = plane;
  
      // add the plane to the hangar
      hangar.planes.push(plane);
  
      // remove the plane from the pending list
      delete planes.pending[id];
  
      // decrease plane count
      planeCount[plane.type] -= 1;
  
      currentX += (width + box);
  
      // check if you reached the end of the row
      if ( (currentX + (width/2)) > hangar.width) {
        currentX = startX;
        currentY -= (height + box);
      }
  
      // check if the top corner of the plane is outside the hangar
      if ((currentY - (height/2)) < 0) {
        break;
      } 
    }
  }

  return { newPlaneCount: planeCount, newPlanes: planes, newHangars: hangars };
}

