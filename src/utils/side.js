const { abs } = Math;

export default function getSide(tooltipper, tooltip) {
  const anchorRect = tooltipper.getBoundingClientRect();
  const popoverRect = tooltip.getBoundingClientRect();

  const tooltipperCenterX = anchorRect.left + anchorRect.width / 2;
  const tooltipperCenterY = anchorRect.top + anchorRect.height / 2;

  const tooltipCenterX = popoverRect.left + popoverRect.width / 2;
  const tooltipCenterY = popoverRect.top + popoverRect.height / 2;

  const deltaX = tooltipCenterX - tooltipperCenterX;
  const deltaY = tooltipCenterY - tooltipperCenterY;

  if (abs(deltaX) > abs(deltaY)) {
    return deltaX > 0 ? 'right' : 'left';
  } else {
    return deltaY > 0 ? 'bottom' : 'top';
  }
}
