export default function getPositionArea(popover) {
  return getComputedStyle(popover).getPropertyValue('position-area');
}
