export default function autoPosition(before) {
  switch (before) {
    case 'middle center':
      return 'bottom center';
    case 'top center':
      return 'bottom center';
    case 'top left':
      return 'bottom left';
    case 'top right':
      return 'bottom right';
    case 'bottom center':
      return 'top center';
    case 'bottom left':
      return 'top left';
    case 'bottom right':
      return 'top right';
    case 'left middle':
      return 'right middle';
    case 'right middle':
      return 'left middle';
  }
}
