export default function getSide(anchor, popover) {
  const anchorRect = anchor.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();

  const popoverEdge = {
    top: Math.ceil(popoverRect.top),
    bottom: Math.ceil(popoverRect.bottom),
    left: Math.ceil(popoverRect.left),
    right: Math.ceil(popoverRect.right)
  };

  const anchorEdge = {
    top: Math.ceil(anchorRect.top),
    bottom: Math.ceil(anchorRect.bottom),
    left: Math.ceil(anchorRect.left),
    right: Math.ceil(anchorRect.right)
  };

  if (popoverEdge.bottom <= anchorEdge.top) {
    return 'top';
  }

  if (popoverEdge.top >= anchorEdge.bottom) {
    return 'bottom';
  }

  if (popoverEdge.right <= anchorEdge.left) {
    return 'left';
  }

  if (popoverEdge.left >= anchorEdge.right) {
    return 'right';
  }
}
