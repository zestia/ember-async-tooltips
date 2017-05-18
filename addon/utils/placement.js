const { round } = Math;

export function placementToString(placement = {}) {
  let string = '';
  string += placement.N ? 'N' : placement.S ? 'S' : '';
  string += placement.E ? 'E' : placement.W ? 'W' : '';
  return string;
}

export function stringToPlacement(string) {
  return {
    N: /^N/.test(string),
    E: /E$/.test(string),
    S: /^S/.test(string),
    W: /W$/.test(string)
  };
}

export function determinePlacement($element, boundary) {
  const x = $element.offset().left;
  const y = $element.offset().top;

  return {
    N: y < boundary.top,
    E: x > boundary.right,
    S: y > boundary.bottom,
    W: x < boundary.left
  };
}

export function placementBoundary($container, columns = 3, rows = 3) {
  const scrollLeft = $container.scrollLeft();
  const scrollTop  = $container.scrollTop();
  const column     = $container.width() / columns;
  const row        = $container.height() / rows;

  return {
    left:   round(column + scrollLeft),
    top:    round(row + scrollTop),
    right:  round(column * (columns - 1) + scrollLeft),
    bottom: round(row * (rows - 1) + scrollTop)
  };
}

export function placementCoords($element, $reference, string) {
  const refX   = $reference.offset().left;
  const refY   = $reference.offset().top;
  const refH   = $reference.outerHeight();
  const refW   = $reference.outerWidth();
  const elH    = $element.outerHeight();
  const elW    = $element.outerWidth();
  const vrt    = refY + refH / 2 - elH / 2;
  const hrz    = refX + refW / 2 - elW / 2;
  const top    = refY - elH;
  const left   = refX - elW;
  const bottom = refY + refH;
  const right  = refX + refW;
  let coords;

  switch (string) {
    case 'N':  coords = [hrz, top];      break;
    case 'NE': coords = [right, top];    break;
    case 'E':  coords = [right, vrt];    break;
    case 'SE': coords = [right, bottom]; break;
    case 'S':  coords = [hrz, bottom];   break;
    case 'SW': coords = [left, bottom];  break;
    case 'W':  coords = [left, vrt];     break;
    case 'NW': coords = [left, top];     break;
  }

  return coords.map(round);
}
