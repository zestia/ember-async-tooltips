const { round } = Math;
const { keys } = Object;

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

export function determinePlacement(element, boundary) {
  const { left, top } = element.getBoundingClientRect();

  return {
    N: top  < boundary.top,
    E: left > boundary.right,
    S: top  > boundary.bottom,
    W: left < boundary.left
  };
}

export function hasPlacement(placement = {}) {
  return keys(placement).filter(point => !!placement[point]).length > 0;
}

export function placementBoundary(columns = 3, rows = 3, documentElement) {
  const el     = documentElement || document.documentElement;
  const rect   = el.getBoundingClientRect();
  const left   = el.scrollLeft;
  const top    = el.scrollTop;
  const column = rect.width / columns;
  const row    = rect.height / rows;

  return {
    left:   round(column + left),
    top:    round(row + top),
    right:  round(column * (columns - 1) + left),
    bottom: round(row * (rows - 1) + top)
  };
}

export function placementCoords(string, element, reference, documentElement) {
  const docEl      = documentElement || document.documentElement;
  const elRect     = element.getBoundingClientRect();
  const refRect    = reference.getBoundingClientRect();
  const refLeft    = refRect.left + docEl.scrollLeft;
  const refTop     = refRect.top + docEl.scrollTop;
  const refHeight  = refRect.height;
  const refWidth   = refRect.width;
  const elHeight   = elRect.height;
  const elWidth    = elRect.width;
  const vertical   = refTop + refHeight / 2 - elHeight / 2;
  const horizontal = refLeft + refWidth / 2 - elWidth / 2;
  const top        = refTop - elHeight;
  const left       = refLeft - elWidth;
  const bottom     = refTop + refHeight;
  const right      = refLeft + refWidth;
  let coords;

  switch (string) {
    case 'N':  coords = [horizontal, top];    break;
    case 'NE': coords = [right, top];         break;
    case 'E':  coords = [right, vertical];    break;
    case 'SE': coords = [right, bottom];      break;
    case 'S':  coords = [horizontal, bottom]; break;
    case 'SW': coords = [left, bottom];       break;
    case 'W':  coords = [left, vertical];     break;
    case 'NW': coords = [left, top];          break;
  }

  return coords.map(round);
}
