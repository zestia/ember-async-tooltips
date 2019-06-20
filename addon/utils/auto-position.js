export default function autoPosition(reference) {
  switch (reference) {
    case 'top left':
      return 'bottom left';
    case 'top center':
      return 'bottom center';
    case 'top right':
      return 'bottom right';
    case 'middle left':
      return 'right middle';
    case 'middle right':
      return 'left middle';
    case 'middle center':
      return 'bottom center';
    case 'bottom left':
      return 'top left';
    case 'bottom center':
      return 'top center';
    case 'bottom right':
      return 'top right';
  }
}
