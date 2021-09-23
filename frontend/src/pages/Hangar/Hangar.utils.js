export function checkTop(a, b) {

  if (
    (a.top.y < b.bottom.y) &&
    (a.top.y > b.top.y) &&
    (a.top.x < b.right.x) &&
    (a.top.x > b.left.x)) {
      return true;
  }

  return false;
}