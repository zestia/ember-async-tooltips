const {
  abs
} = Math;
function getPositionArea(popover, anchor) {
  const p = popover.getBoundingClientRect();
  const a = anchor.getBoundingClientRect();
  const midX = rect => rect.left + rect.width / 2;
  const midY = rect => rect.top + rect.height / 2;
  let side;
  if (p.bottom <= a.top) side = 'top';else if (p.top >= a.bottom) side = 'bottom';else if (p.right <= a.left) side = 'left';else if (p.left >= a.right) side = 'right';
  if (!side) return;
  const alignments = side === 'top' || side === 'bottom' ? [['center', abs(midX(p) - midX(a))], ['left', abs(p.left - a.left)], ['right', abs(p.right - a.right)]] : [['middle', abs(midY(p) - midY(a))], ['top', abs(p.top - a.top)], ['bottom', abs(p.bottom - a.bottom)]];
  const [alignment] = alignments.reduce((best, candidate) => candidate[1] < best[1] ? candidate : best);
  return `${side} ${alignment}`;
}

export { getPositionArea as default };
//# sourceMappingURL=position-area.js.map
