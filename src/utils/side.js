const { abs } = Math;

export default function getSide(anchor, popover) {
  const anchorRect = anchor.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();

  const anchorCenterX = anchorRect.left + anchorRect.width / 2;
  const anchorCenterY = anchorRect.top + anchorRect.height / 2;

  const popoverCenterX = popoverRect.left + popoverRect.width / 2;
  const popoverCenterY = popoverRect.top + popoverRect.height / 2;

  const deltaX = popoverCenterX - anchorCenterX;
  const deltaY = popoverCenterY - anchorCenterY;

  if (abs(deltaX) > abs(deltaY)) {
    return deltaX > 0 ? 'right' : 'left';
  } else {
    return deltaY > 0 ? 'bottom' : 'top';
  }
}
